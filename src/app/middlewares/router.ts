import koaJwt from 'koa-jwt'
import { Context, ParameterizedContext } from 'koa'
import compose, { Middleware } from 'koa-compose'
import publicRouter from '@routes/public'
import privateRouter from '@routes/private'
import { app as config } from '@/config.json'
import redis from '@utils/redis'

const jwt: koaJwt.Middleware = koaJwt({
  secret: config.jwtSecret,
  cookie: 'token',
  key: 'jwtData',
  tokenKey: 'jwt'
})

const isTokenExisted: Middleware<
  ParameterizedContext<any, {}>
> = async function (ctx: Context, next: () => Promise<any>): Promise<void> {
  const jwt: string = ctx.state.jwt
  const existed: boolean = !!(await redis.get(jwt))
  if (!existed) {
    ctx.cookies.set('token', undefined)
    ctx.throw(401, "token doesn't exist")
    return
  }
  await next()
}

export default compose([
  publicRouter.routes(),
  publicRouter.allowedMethods(),
  jwt,
  isTokenExisted,
  privateRouter.routes(),
  privateRouter.allowedMethods()
])
