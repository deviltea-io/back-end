import { Context } from 'koa'
import { User, UserDocument } from '@models/user'

async function auth (ctx: Context): Promise<void> {
  let userId: string = ctx.state.jwtData.userId
  const user: UserDocument | null = await User.findById(userId).exec()
  if (user === null) {
    ctx.throw(401, 'unknown user')
  } else {
    ctx.status = 200
    ctx.body = {
      name: user.name,
      avatarUrl: user.avatarUrl,
      permission: user.permission
    }
  }
}

export default auth
