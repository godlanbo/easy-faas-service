import Koa from 'koa'
import Router from 'koa-router'
import Crypto from 'crypto-js'
import JsonWebToken from 'jsonwebtoken'
import { PRIVATE_KEY } from './constant'

/**
 * 注册一个Router实例
 * @param app Koa实例/Router实例
 * @param router Router实例
 */
export function registeRouter(app: Koa | Router, router: Router) {
  app.use(router.routes()).use(router.allowedMethods())
}

export function getJwtToken(username: string) {
  return JsonWebToken.sign({ username }, PRIVATE_KEY, {
    expiresIn: '7d'
  })
}
