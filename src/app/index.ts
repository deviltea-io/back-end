import Koa from 'koa'
import logger from '@middlewares/logger'
import errorHandler from '@middlewares/errorHandler'
import bodyparser from '@middlewares/bodyparser'
import cors from '@middlewares/cors'
import protector from '@middlewares/protector'
import router from '@middlewares/router'

const app: Koa<any, {}> = new Koa()

export default app
  .use(errorHandler)
  .use(logger)
  .use(cors)
  .use(protector)
  .use(bodyparser)
  .use(router)
