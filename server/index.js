const config = require("../config.json")

const Koa = require('koa')
const Router = require('koa-router')
const consola = require('consola')
const {
  Nuxt,
  Builder
} = require('nuxt')
const koaBody = require('koa-body')
const router = new Router()

const api = require("./api.js")

const app = new Koa()

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(koaBody({
    formidable:{uploadDir: config.uploadDir},    //This is where the files would come
    multipart: true
  }));

  router.use('/api', api.routes(), api.allowedMethods())
  app.use(router.routes()).use(router.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()