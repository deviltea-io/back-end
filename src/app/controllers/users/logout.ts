import { Context } from 'koa'
import redis from '@utils/redis'

async function logout (ctx: Context): Promise<void> {
  const jwt: string = ctx.state.jwt
  const existed: boolean = !!(await redis.get(jwt))
  if (existed) {
    await redis.del(jwt)
    ctx.cookies.set('token', undefined)
    ctx.status = 204
  } else {
    ctx.throw(401, 'unknown token')
  }
}

export default logout
