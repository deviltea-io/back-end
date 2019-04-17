import { Context } from 'koa'
import { User, UserDocument } from '@models/user'

async function getUser (ctx: Context): Promise<void> {
  let userId: string = ctx.params.userId
  const user: UserDocument | null = await User.findById(userId).exec()
  if (user === null) {
    ctx.throw(404, 'unknown user')
  } else {
    ctx.status = 200
    ctx.body = {
      name: user.name,
      avatarUrl: user.avatarUrl,
      permission: user.permission
    }
  }
}

export default getUser
