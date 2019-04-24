import { Context } from 'koa'
import { Article, ArticleDocument } from '@models/article'
import * as t from 'io-ts'

const RequestParams = t.type({
  articleId: t.string
})

async function createArticle (ctx: Context): Promise<void> {
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
      if (article.deleted) {
        await article.remove()
      } else {
        article.deleted = true
        await article.save()
      }
      ctx.status = 204
      return
    }
  }
}

export default createArticle
