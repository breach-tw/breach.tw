const router = require('koa-router')()
const db = require("./db.js")
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
}
start()
module.exports = router