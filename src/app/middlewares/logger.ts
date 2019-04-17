import koaLogger from 'koa-logger'
import { ParameterizedContext } from 'koa'
import { Middleware } from 'koa-compose'

const logger: Middleware<ParameterizedContext<any, {}>> = koaLogger()

export default logger
