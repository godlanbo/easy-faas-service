import { ErrorResponse, SuccessResponse } from '../model/request'
import { IUserServiceResponse } from '../model/service'
import { IUser } from '../model/user'
import { request } from '../common/request'
import { getJwtToken } from '../common/utils'
import { ERROR_CODE } from '../common/constant'
import { Context } from 'koa'
import fs from 'fs'
import path from 'path'

export async function registerUserService(userInfo: IUser) {
  const { data: res } = await request<IUserServiceResponse>({
    url: 'https://nh54dd1r9d.hk.aircode.run/user_registe',
    method: 'get',
    params: {
      ...userInfo
    }
  })

  const { code, data, message } = res
  console.log('🚀 ~ registerUserService ~ res:', res)
  if (code === ERROR_CODE) {
    return new ErrorResponse(message)
  } else {
    // 创建用户空间
    createUserSpaceService(userInfo);
    return injectJwtService(new SuccessResponse(data, message), userInfo)
  }
}

export async function loginService(userInfo: IUser) {
  const { data: res } = await request<IUserServiceResponse>({
    url: 'https://nh54dd1r9d.hk.aircode.run/user_login',
    method: 'get',
    params: {
      ...userInfo
    }
  })

  const { code, data, message } = res
  if (code === ERROR_CODE) {
    return new ErrorResponse(message)
  } else {
    return injectJwtService(new SuccessResponse(data, message), userInfo)
  }
}

export function injectJwtService(reponse: SuccessResponse, userInfo: IUser) {
  reponse.setDataField('token', getJwtToken(userInfo.username))
  return reponse
}


export function getUsernameService(ctx: Context) {
  return ctx.state.user.username || ''
}

export function createUserSpaceService(userInfo: IUser) {
  const targetPath = path.resolve(__dirname, '../../user-space', `./${userInfo.username}`)

  console.log('🚀 ~ createUserSpaceService ~ targetPath:', targetPath)
  fs.mkdirSync(targetPath)

  return;
}
