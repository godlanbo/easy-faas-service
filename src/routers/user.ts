import Router from 'koa-router'
import { IUser } from '../model/user'
import { loginService, registerUserService } from '../services/user'

const router = new Router({
  prefix: '/user'
})

router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body as IUser

  ctx.body = await registerUserService({ password, username })
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body as IUser

  ctx.body = await loginService({ username, password })
})

export default router
