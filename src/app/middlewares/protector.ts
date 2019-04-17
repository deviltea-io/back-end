import koaHelmet from 'koa-helmet'
import protect from 'koa-protect'
import { RateLimit } from 'koa2-ratelimit'
import { ParameterizedContext } from 'koa'
import compose, { Middleware } from 'koa-compose'

const helmet: Middleware<ParameterizedContext<any, {}>> = koaHelmet()
const xss: Middleware<ParameterizedContext<any, {}>> = protect.koa.xss({
  body: true,
  loggerFunction: console.error,
})
const globalLimiter: Middleware<
  ParameterizedContext<any, {}>
> = RateLimit.middleware({
  interval: { min: 1 },
  max: 100,
})

export default compose([helmet, xss, globalLimiter])
