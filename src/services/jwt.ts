import jwt from 'koa-jwt'
import { PRIVATE_KEY } from '../common/constant'

export const jwtAuthService = jwt({
  secret: PRIVATE_KEY
})
