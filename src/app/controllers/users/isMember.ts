import { Context } from 'koa'
import { Permission, UserDocument, User } from '@models/user'

async function isMember (ctx: Context, next: () => Promise<any>): Promise<void> {
  const userId: string = ctx.state.jwtData.userId
  const user: UserDocument | null = await User.findById(userId).exec()
  if (user === null) {
    ctx.cookies.set('token', undefined)
    ctx.throw(401, 'unknown user')
  } else if (
    user.permission === Permission.Member ||
    user.permission === Permission.Admin
  ) {
    await next()
  } else {
    ctx.throw(403, 'permission denied')
  }
}

export default isMember
