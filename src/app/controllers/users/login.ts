import { Context } from 'koa'
import { auth } from 'firebase-admin'
import jwt from 'jsonwebtoken'
import '@utils/firebase-auth'
import { User, UserDocument } from '@models/user'
import { app as config } from '@/config.json'

async function login (ctx: Context): Promise<void> {
  const idToken: string = ctx.request.body.idToken
  ctx.assert(idToken, 400, 'idToken required')
  const decodedToken: auth.DecodedIdToken = await auth().verifyIdToken(idToken)
  const uid: string = decodedToken.uid
  const userRecord: auth.UserRecord = await auth().getUser(uid)
  const providerUserInfo: auth.UserInfo = userRecord.providerData[0]
  let user: UserDocument | null = await User.findByOAuthUid(uid).exec()
  if (!user) {
    user = await new User({
      oAuthUid: uid,
      name: providerUserInfo.displayName,
      email: providerUserInfo.email,
      avatarUrl: providerUserInfo.photoURL
    }).save()
  }
  const token: string = jwt.sign(
    {
      userId: user.id
    },
    config.jwtSecret
  )
  ctx.cookies.set('token', token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // ONE MONTH
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain: 'localhost',
    overwrite: true
  })
  ctx.status = 200
  ctx.body = {
    token
  }
}

export default login
