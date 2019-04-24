import { Context } from 'koa'
import { Article, ArticleDocument } from '@models/article'
import * as t from 'io-ts'

const RequestParams = t.type({
  articleId: t.string
})

async function getArticleContent (ctx: Context): Promise<void> {
  const validatedParamsResult = RequestParams.decode(ctx.params)

  if (validatedParamsResult.isLeft()) {
    ctx.throw(400, 'bad request')
    return
  } else {
    const { articleId } = validatedParamsResult.value
    let article: ArticleDocument | null = null
    try {
      article = await Article.findByIdAndUpdate(articleId, {
        $inc: { viewCount: 1 }
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

export default getArticleContent
