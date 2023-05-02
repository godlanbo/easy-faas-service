import { main } from './main'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import json from 'koa-json'
import Router from 'koa-router'

const router = new Router()

const app = new Koa()
app.use(cors())
app.use(bodyParser())
app.use(json())

app.use(async (ctx, next) => {
  // main()
  console.log('main', ctx.request.method)
  console.log('query @@', ctx.request.path)
  next()
})

router.get('/', (ctx, next) => {
  // ctx.router available
  console.log('main', ctx.request.method)
  console.log('query @@22', ctx.request.query)
  ctx.body = 'Hello World2'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listening on port 3000')
})
