import Router from 'koa-router'
import {
  createFaasInstanceService,
  getFaasFileContent,
  getUserFaasFileList,
  getUserFaasList
} from '../services/faas'
import { IFaasInstanceOptions } from '../model/faas'

const router = new Router({
  prefix: '/instance'
})

// 新建一个faas实例
router.post('/', async (ctx, next) => {
  const { name, nodeVersion } = ctx.request.body as IFaasInstanceOptions

  console.log('router', ctx.state)

  ctx.body = await createFaasInstanceService(ctx, { name, nodeVersion })
})

router.get('/list', async (ctx, next) => {

  ctx.body = await getUserFaasList(ctx)
})

router.get('/file/list', async (ctx, next) => {
  const { faasId = '' } = ctx.request.query

  ctx.body = await getUserFaasFileList(ctx, faasId as string)
})

router.get('/file/:filename', async (ctx, next) => {
  const { filename } = ctx.params
  const { faasId = '' } = ctx.request.query

  ctx.body = await getFaasFileContent(faasId as string, filename, ctx)
})



export default router
