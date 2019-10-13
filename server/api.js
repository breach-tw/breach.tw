const router = require('koa-router')()
const db = require("./db.js")
const { readLog, pps } = require('./file-preprocessor.js')
const uuidv1 = require('uuid/v1');
const fs = require('fs')

const sendMail = require('./email.js').send
const EmailString = require('./email.js').EmailString

// Import Task global var
const tasks = {};
const mailtasks = {};



function isFileExist(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, function(err, stat) {
            if(err == null) {
                resolve(true);
            } else if(err.code === 'ENOENT') {
                resolve(false)
            } else {
                reject(err);
            }
        });
    })
}

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            resolve(data);
          });
    })
    
}

async function wait(promises) {
    for (const promise of promises) {
        try {
            await promise;
        } catch (e) {

        }
    }
    return;
}

function MakeQuerablePromise(promise) {
    // Don't create a wrapper for promises that can already be queried.
    if (promise.isResolved) return promise;

    var isResolved = false;
    var isRejected = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
       function(v) { isResolved = true; return v; }, 
       function(e) { isRejected = true; throw e; });
    result.isFulfilled = function() { return isResolved || isRejected; };
    result.isResolved = function() { return isResolved; }
    result.isRejected = function() { return isRejected; }
    return result;
}

async function start() {
    const pool = await db.connect()

    router
        .get('/source', async ctx => {
            const filters = ctx.query;
            const data = await db.source.get(filters, pool)

            ctx.body = data;
        })
        .post('/source', async ctx => {
            const data = ctx.request.body;
            const resultId = await db.source.add(data, pool)

            ctx.body = {
                id: resultId
            }
        })
        .delete('/source', async ctx => {
            const filter = ctx.request.body;
            const data = await db.source.delete(filter, pool)

            ctx.body = data
        })
        .patch('/source', async ctx => {
            const {
                update,
                filter
            } = ctx.request.body;
            const data = await db.source.update(update, filter, pool)

            ctx.body = data
        })

    router
        .get('/source_item', async ctx => {
            const filters = ctx.query;
            const data = await db.source.getItem(filters, pool)

            ctx.body = data;
        })
        .post('/source_item', async ctx => {
            const {
                sourceId,
                itemId
            } = ctx.request.body;
            const resultId = await db.source.addItem(sourceId, itemId, pool)

            ctx.body = {
                id: resultId
            }
        })
        .delete('/source_item', async ctx => {
            const filter = ctx.request.body;
            const data = await db.source.deleteItem(filter, pool)

            ctx.body = data
        })
        .patch('/source_item', async ctx => {
            const {
                update,
                filter
            } = ctx.request.body;
            const data = await db.source.updateItem(update, filter, pool)

            ctx.body = data
        })

    router
        .get('/log', async ctx => {
            const filters = ctx.query;
            const data = await db.log.get(filters, pool)

            ctx.body = data;
        })
        .post('/log', async ctx => {
            const {
                hash,
                sourceId
            } = ctx.request.body;
            const resultId = await db.log.add(hash, sourceId, pool)

            ctx.body = {
                id: resultId
            }
        })
        .delete('/log', async ctx => {
            const filter = ctx.request.body;
            const data = await db.log.delete(filter, pool)

            ctx.body = data
        })
        .patch('/log', async ctx => {
            const {
                update,
                filter
            } = ctx.request.body;
            const data = await db.log.update(update, filter, pool)

            ctx.body = data
        })
    
    router
        .post('/import/process', async ctx => {
            const { source, filePath, s1pps, s2pps } = ctx.request.body;
            let result;

            if (filePath === undefined || source === undefined) {
                ctx.status = 418;
                return;
            }

            if (await isFileExist(filePath) === false) {
                ctx.status = 404;
                return;
            }

            let uuid = uuidv1();
            while (uuid in tasks) {
                uuid = uuidv1();
            }

            tasks[uuid] = {promises: []};
            tasks[uuid]["main"] = MakeQuerablePromise(new Promise((resolve, reject) => {
                const readline = readLog(filePath, source, s1pps, s2pps);
                let result;
                while (result = readline.next()) {
                    if (!result.done) {
                        let datas = result.value;
                        tasks[uuid]['promises'].push(MakeQuerablePromise(db.log.batch.add(datas)));
                    } else {
                        let error = result.value;
                        wait(tasks[uuid]['promises']).then(() => {
                            delete tasks[uuid]["promises"]
                            resolve(error)
                        })
                        break;
                    }
                }
            }))

            ctx.body = uuid;
        })
        .post("/import/upload", async ctx => {
            const filePath = ctx.request.files.file.path;
            ctx.body = filePath;
        })
        .get("/import/task", async ctx => {
            const { id } = ctx.query
            if (id in tasks) {
                let count = 0;
                if (tasks[id]["promises"]) {
                    for (task of tasks[id]["promises"]) {
                        if (task.isResolved()) {
                            count++;
                        }
                    }
                    ctx.body = `${count}/${tasks[id]["promises"].length}`
                }
                else {
                    ctx.body = await tasks[id]["main"];
                }
            }
        })
        .get("/import/tasklist", async ctx => {
            ctx.body = Object.keys(tasks)
        })
        .get('/import/pps', async ctx => {
            ctx.body = {
                s1: pps.s1.descs,
                s2: pps.s2.descs
            }
        })
        
    router
        .get('/item', async ctx => {
            const filters = ctx.query;
            const data = await db.item.get(filters, pool)

            ctx.body = data;
        })
        .post('/item', async ctx => {
            const {
                id,
                name,
                abbr
            } = ctx.request.body;
            const resultId = await db.item.add( id, name, abbr, pool)
            ctx.body = {
                id: resultId
            }
        })
        .delete('/item', async ctx => {
            const filter = ctx.request.body;
            const data = await db.item.delete(filter, pool)

            ctx.body = data
        })
        .patch('/item', async ctx => {
            const {
                update,
                filter
            } = ctx.request.body;
            const data = await db.item.update(update, filter, pool)

            ctx.body = data
        })

    router
        .get('/mail', async ctx => {
            const { id } = ctx.query
            if (id in mailtasks) {
                let count = 0;
                if (mailtasks[id]["promises"]) {
                    for (task of mailtasks[id]["promises"]) {
                        if (task.isResolved()) {
                            count++;
                        }
                    }
                    ctx.body = `${count}/${mailtasks[id]["promises"].length}`
                }
                else {
                    ctx.body = await mailtasks[id]["main"];
                }
            }
        })
        .post('/mail', async ctx => {
            const sourceId = ctx.query.source;
            const source = await db.source.get({ id: sourceId }, pool);

            const mail = EmailString(await readFile('email.html')).fill({
                source: source[0].name
            })

            const users = (await db.mail(sourceId, pool))

            let uuid = uuidv1();
            while (uuid in mailtasks) {
                uuid = uuidv1();
            }

            mailtasks[uuid] = {promises: []};
            mailtasks[uuid]["main"] = MakeQuerablePromise(new Promise((resolve, reject) => {
                for (const user of users) {
                    const mail_inner = mail.fill({user: user.name});
                    mailtasks[uuid]['promises'].push(MakeQuerablePromise(sendMail(user.email, mail_inner.get(), user.name)));
                }

                wait(mailtasks[uuid]['promises']).then(() => {
                    const error = mailtasks[uuid]["promises"].filter(x => x.isRejected()).length;
                    delete mailtasks[uuid]["promises"]
                    resolve(error)
                })
            }))

            ctx.body = uuid;
        })
        
}
start()
module.exports = router