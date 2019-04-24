import { Context } from 'koa'
import { Article, ArticleDocument } from '@models/article'
import { User, Permission } from '@models/user'
import * as t from 'io-ts'
import jwt from 'jsonwebtoken'
import { app as config } from '@/config.json'

const RequestParams = t.type({
  articleId: t.string
})

async function getArticleInfo (ctx: Context): Promise<void> {
  const validatedResult = RequestParams.decode(ctx.params)
  if (validatedResult.isLeft()) {
    ctx.throw(400, 'bad request')
    return
  } else {
    const { articleId } = validatedResult.value
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
      ctx.status = 200
      ctx.body = {
        coverUrl: article.coverUrl,
        title: article.title,
        tags: article.tags,
        viewCount: article.viewCount,
        commentCount: article.commentCount,
        createdTime: article.createdTime,
        updatedTime: article.updatedTime,
        deleted: article.deleted,
        locked: article.locked
      }
      return
    }
  }
}

export default getArticleInfo
