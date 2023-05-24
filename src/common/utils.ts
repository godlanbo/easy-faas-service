import Koa from 'koa'
import Router from 'koa-router'
import Crypto from 'crypto-js'
import JsonWebToken from 'jsonwebtoken'
import { PRIVATE_KEY } from './constant'
import path from 'path'
import fs from 'fs'

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

/**
 * 获取用户空间的目录path
 * @param username
 * @returns
 */
export function getUserSpaceUserDirPath(username: string) {
  return path.resolve(__dirname, '../../user-space', `./${username}`)
}

export function getUserSpaceUserFaasDirPath(
  faasName: string,
  username: string
) {
  return path.resolve(getUserSpaceUserDirPath(username), `./${faasName}`)
}

export function getDirFileList(targetPath: string, fileList: any[] = []) {
  const sourceFile = fs.readdirSync(targetPath, { withFileTypes: true })

  sourceFile.forEach(file => {
    if (file.isFile()) {
      // 只要js后缀的文件
      if (file.name.match(/\.js$/)) {
        fileList.push({
          filename: file.name,
          fileType: 'file'
        })
      }
    } else if (file.isDirectory()) {
      const dirFileList: any[] = []
      fileList.push({
        fileName: file.name,
        fileType: 'directory',
        fileList: dirFileList
      })
      getDirFileList(path.resolve(targetPath, `./${file.name}`), dirFileList)
    }
  })

  return fileList
}
