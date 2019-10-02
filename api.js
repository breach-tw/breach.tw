async function init(router, db){
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
            const {update, filter} = ctx.request.body;
            const data = await db.source.update(update, filter, pool)

            ctx.body = data
        })
}

module.exports = {
    init
}