import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import json from 'koa-json'
import RootRouter from './routers'
import { registeRouter } from './common/utils'

const app = new Koa()
app.use(cors())
app.use(bodyParser())
app.use(json())

registeRouter(app, RootRouter)

app.listen(8032, () => {
  console.log('listening on port 8032')
})
