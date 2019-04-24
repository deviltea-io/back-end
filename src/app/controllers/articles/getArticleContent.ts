import bcrypt from 'bcryptjs'
import { Context } from 'koa'
import { Article, ArticleDocument } from '@models/article'
import { User, Permission } from '@models/user'
import * as t from 'io-ts'
import jwt from 'jsonwebtoken'
import { app as config } from '@/config.json'

const RequestParams = t.type({
  articleId: t.string
})

const RequestBody = t.type({
  password: t.string
})

async function getArticleContent (ctx: Context): Promise<void> {
  const validatedParamsResult = RequestParams.decode(ctx.params)
  const validatedBodyResult = RequestBody.decode(ctx.request.body)

  if (validatedParamsResult.isLeft() || validatedBodyResult.isLeft()) {
    ctx.throw(400, 'bad request')
    return
  } else {
    const { articleId } = validatedParamsResult.value
    let article: ArticleDocument | null = null
    try {
      article = await Article.findById(articleId).exec()
    } catch {
      ctx.throw(404, 'article not found')
      return
    }
    if (article === null) {
      ctx.throw(404, 'article not found')
      return
    } else {
      if (article.password) {
        let isAdmin = false
        const token = ctx.cookies.get('token')
        if (token) {
          const { userId } = jwt.verify(token, config.jwtSecret) as {
            userId: string
          }
          const user = await User.findById(userId).exec()
          if (user !== null) {
            isAdmin = user.permission === Permission.Admin
          }
        }

        if (article.deleted && !isAdmin) {
          ctx.throw(404, 'article not found')
          return
        }

        const { password } = validatedBodyResult.value
        if (
          !isAdmin &&
          (!password || !(await bcrypt.compare(password, article.password)))
        ) {
          ctx.throw(400, 'wrong password')
          return
        }
      }
      ctx.status = 200
      ctx.body = {
        content: article.content
      }
      return
    }
  }
}

export default getArticleContent
