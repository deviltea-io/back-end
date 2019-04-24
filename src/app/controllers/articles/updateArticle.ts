import bcrypt from 'bcryptjs'
import { Context } from 'koa'
import { Article, ArticleDocument } from '@models/article'
import * as t from 'io-ts'

const RequestBody = t.type({
  coverUrl: t.string,
  title: t.string,
  tags: t.array(t.string),
  content: t.string,
  password: t.string
})

const RequestParams = t.type({
  articleId: t.string
})

async function createArticle (ctx: Context): Promise<void> {
  const validatedParamsResult = RequestParams.decode(ctx.params)
  const validatedBodyResult = RequestBody.decode(ctx.request.body)

  if (validatedParamsResult.isLeft() || validatedBodyResult.isLeft()) {
    ctx.throw(400, 'bad request')
    return
  } else {
    const {
      coverUrl,
      title,
      tags,
      content,
      password
    } = validatedBodyResult.value
    const { articleId } = validatedParamsResult.value
    let article: ArticleDocument | null = null
    try {
      article = await Article.findByIdAndUpdate(articleId, {
        coverUrl,
        title,
        tags,
        content,
        password: password ? await bcrypt.hash(password, 10) : null,
        updatedTime: new Date()
      }).exec()
    } catch {
      ctx.throw(404, 'article not found')
      return
    }
    if (article === null) {
      ctx.throw(404, 'article not found')
      return
    } else {
      ctx.status = 204
      return
    }
  }
}

export default createArticle
