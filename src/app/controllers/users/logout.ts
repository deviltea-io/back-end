import { Context } from 'koa'
import redis from '@utils/redis'

async function logout (ctx: Context): Promise<void> {
  const jwt: string = ctx.state.jwt
  await redis.del(jwt)
  ctx.cookies.set('token', undefined)
  ctx.status = 204
}

export default logout
