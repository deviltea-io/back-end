import { Context } from 'koa'
import { User, UserDocument, Permission } from '@models/user'

async function isAdmin (ctx: Context, next: () => Promise<any>): Promise<void> {
  let userId: string = ctx.state.jwtData.userId
  const user: UserDocument | null = await User.findById(userId).exec()
  if (user === null) {
    ctx.throw(404, 'unknown user')
  } else if (user.permission === Permission.Admin) {
    await next()
  } else {
    ctx.throw(403, 'permission denied')
  }
}

export default isAdmin
