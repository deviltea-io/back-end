import { Context } from 'koa'
import { User, UserDocument, Permission } from '@models/user'

async function isAdmin (ctx: Context, next: () => Promise<any>): Promise<void> {
  const userId: string = ctx.state.jwtData.userId
  let user: UserDocument | null = null
  try {
    user = await User.findById(userId).exec()
  } catch {
    ctx.cookies.set('token', undefined)
    ctx.throw(401, 'unknown user')
    return
  }
  if (user === null) {
    ctx.cookies.set('token', undefined)
    ctx.throw(401, 'unknown user')
    return
  } else if (user.permission === Permission.Admin) {
    await next()
  } else {
    ctx.throw(403, 'permission denied')
    return
  }
}

export default isAdmin
