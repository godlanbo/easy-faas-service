import { ErrorResponse, SuccessResponse } from '../model/request'
import { IUserServiceResponse } from '../model/service'
import { IUser } from '../model/user'
import { request } from '../common/request'
import { getJwtToken } from '../common/utils'
import { ERROR_CODE } from '../common/constant'

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
    return injectJwt(new SuccessResponse(data, message), userInfo)
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
    return injectJwt(new SuccessResponse(data, message), userInfo)
  }
}

export function injectJwt(reponse: SuccessResponse, userInfo: IUser) {
  reponse.setDataField('token', getJwtToken(userInfo.username))
  return reponse
}
