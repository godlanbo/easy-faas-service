import { Context } from 'koa'
import { IFaasInstanceOptions } from '../model/faas'
import { getUsernameService } from './user'
import path from 'path'
import fs from 'fs'
import { request } from '../common/request'
import {
  ICreateFaasServiceResponse,
  IFaasListServiceResponse,
  IGetFaasInfoByIdServiceResponse
} from '../model/service'
import { ERROR_CODE } from '../common/constant'
import { ErrorResponse, SuccessResponse } from '../model/request'
import {
  getDirFileList,
  getUserSpaceUserDirPath,
  getUserSpaceUserFaasDirPath
} from '../common/utils'

export async function createFaasInstanceService(
  ctx: Context,
  options: IFaasInstanceOptions
) {
  const username = getUsernameService(ctx)
  console.log('🚀 ~ username:', username)

  const { data: res } = await request<ICreateFaasServiceResponse>({
    url: 'https://nh54dd1r9d.hk.aircode.run/faas_new',
    method: 'get',
    params: {
      faasName: options.name,
      nodeVersion: options.nodeVersion,
      owner: username
    }
  })

  const { data, code, message } = res
  if (code === ERROR_CODE) {
    return new ErrorResponse(message)
  } else {
    const targetUserFaasDir = getUserSpaceUserFaasDirPath(
      options.name,
      username
    )

    fs.mkdirSync(targetUserFaasDir)

    const expFilePath = path.resolve(__dirname, '../../example')

    const sourceFile = fs.readdirSync(expFilePath, { withFileTypes: true })

    sourceFile.forEach(file => {
      const newSourcePath = path.resolve(expFilePath, file.name)
      const newTargetPath = path.resolve(targetUserFaasDir, file.name)
      fs.copyFileSync(newSourcePath, newTargetPath)
    })
    return new SuccessResponse(data, message)
  }
}

export async function getFaasNameByFaasId(faasId: string) {
  const { data: res } = await request<IGetFaasInfoByIdServiceResponse>({
    url: 'https://nh54dd1r9d.hk.aircode.run/get_faas_name',
    params: {
      faasId
    }
  })

  const { data, code, message } = res

  return data.faasName
}

export async function getFaasFileContent(
  faasId: string,
  filename: string,
  ctx: Context
) {
  const faasName = await getFaasNameByFaasId(faasId)
  const username = await getUsernameService(ctx)

  const filePath = path.resolve(
    getUserSpaceUserFaasDirPath(faasName, username),
    `./${filename}.js`
  )
  const fileContent = fs.readFileSync(filePath).toString()

  return new SuccessResponse(fileContent, '获取成功')
}

export async function getUserFaasList(ctx: Context) {
  const username = await getUsernameService(ctx)

  const { data: res } = await request<IFaasListServiceResponse>({
    url: 'https://nh54dd1r9d.hk.aircode.run/faas_list',
    params: {
      owner: username
    }
  })

  return new SuccessResponse(res.data, res.message)
}

export async function getUserFaasFileList(ctx: Context, faasId: string) {
  const username = await getUsernameService(ctx)
  const faasName = await getFaasNameByFaasId(faasId)

  const dirPath = getUserSpaceUserFaasDirPath(faasName, username)

  const fileList = getDirFileList(dirPath)

  return new SuccessResponse(fileList, '获取文件列表成功')
}
