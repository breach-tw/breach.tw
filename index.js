const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

const api = require("./api.js")
const db = require("./db.js")

app.use(koaBody());

api.init(router, db).then(() => {
    app.use(router.routes());
})

app.listen(3000);