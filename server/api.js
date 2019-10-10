const router = require('koa-router')()
const db = require("./db.js")
const { readLog, pps } = require('./file-preprocessor.js')
const uuidv1 = require('uuid/v1');

// Import Task global var
const tasks = {};

function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v; 
        }, 
        function(e) {
            isRejected = true;
            isPending = false;
            throw e; 
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
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
        .get('/item', async ctx => {
            const filters = ctx.query;
            const data = await db.source.getItem(filters, pool)

            ctx.body = data;
        })
        .post('/item', async ctx => {
            const {
                sourceId,
                itemId
            } = ctx.request.body;
            const resultId = await db.source.addItem(sourceId, itemId, pool)

            ctx.body = {
                id: resultId
            }
        })
        .delete('/item', async ctx => {
            const filter = ctx.request.body;
            const data = await db.source.deleteItem(filter, pool)

            ctx.body = data
        })
        .patch('/item', async ctx => {
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
        .post('/import/logs', async ctx => {
            const { source, filePath, s1pps, s2pps } = ctx.request.body;
            let result;

            let uuid = uuidv1();
            while (uuid in tasks) {
                uuid = uuidv1();
            }

            tasks[uuid] = {promises: []};
            tasks[uuid]["main"] = MakeQuerablePromise(new Promise((resolve, reject) => {
                const readline = readLog(filePath, source, JSON.parse(s1pps), JSON.parse(s2pps));
                let result;
                while (result = readline.next()) {
                    if (!result.done) {
                        let datas = result.value;
                        tasks[uuid]['promises'].push(MakeQuerablePromise(db.log.batch.add(datas)));
                    } else {
                        let error = result.value;
                        Promise.all(tasks[uuid]['promises']).then(() => {
                            delete tasks[uuid]["promises"]
                            resolve(error)
                        })
                        break;
                    }
                }
            }))

            ctx.body = uuid;
        })
        .post("/import/file", async ctx => {
            const filePath = ctx.request.files.file.path;
            ctx.body = filePath;
        })
        .get("/import/task", async ctx => {
            const { id } = ctx.query
            if (id in tasks) {
                let count = 0;
                if (tasks[id]["promises"]) {
                    for (task in tasks[id]["promises"]) {
                        if (task.isFulfilled) {
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
        .get("/import/task/list", async ctx => {
            ctx.body = Object.keys(tasks)
        })
        .get('/import/pps', async ctx => {
            ctx.body = {
                s1: pps.s1.subs,
                s2: pps.s2.subs
            }
        })
}
start()
module.exports = router