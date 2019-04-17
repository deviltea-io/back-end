import koaBodyparser from 'koa-bodyparser'
import { Middleware } from 'koa-compose'
import { ParameterizedContext, Context } from 'koa'

const bodyparser: Middleware<ParameterizedContext<any, {}>> = koaBodyparser({
  onerror: function (err: Error, ctx: Context): void {
    console.log(err)
    ctx.throw('body parse error', 422)
  },
})

export default bodyparser
