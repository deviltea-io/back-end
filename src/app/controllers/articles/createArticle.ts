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

async function createArticle (ctx: Context) {
  const validatedResult = RequestBody.decode(ctx.request.body)
  if (validatedResult.isLeft()) {
    ctx.throw(400, 'bad request')
    return
  } else {
    let { title, tags, content, coverUrl, password } = validatedResult.value
    let article: ArticleDocument
    if (password) {
      password = await bcrypt.hash(password, 10)
    }
    article = new Article({ coverUrl, title, tags, content, password })

    article = await article.save()
    ctx.status = 200
    ctx.body = {
      articleId: article.id
    }
    return
  }
}

export default createArticle
