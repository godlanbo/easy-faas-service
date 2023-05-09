import Router from 'koa-router'
import UserRouter from './user'
import { registeRouter } from '../common/utils'
import { jwtAuthService } from '../services/jwt'

const router = new Router({
  prefix: '/faas'
})

registeRouter(router, UserRouter)

router.use(jwtAuthService)

router.get('/private', async (ctx, next) => {
  ctx.body = ctx.state
})

export default router
