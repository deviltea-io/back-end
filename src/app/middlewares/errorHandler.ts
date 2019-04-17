import { ParameterizedContext, Context } from 'koa'
import { Middleware } from 'koa-compose'

const errotHandler: Middleware<ParameterizedContext<any, {}>> = async function (
  ctx: Context,
  next: () => Promise<any>
): Promise<void> {
  try {
    await next()
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500
    ctx.body = {
      message: error.message
    }
  }
}

export default errotHandler
