import { Context } from 'koa'
import { Article } from '@models/article'
import { User, Permission } from '@models/user'
import * as t from 'io-ts'
import jwt from 'jsonwebtoken'
import { app as config } from '@/config.json'

const RequestQueryString = t.type({
  index: t.union([t.number, t.undefined]),
  amount: t.union([t.number, t.undefined]),
  tag: t.union([t.string, t.undefined]),
  sort: t.union([t.string, t.undefined]),
  ascending: t.union([t.boolean, t.undefined])
})

async function getArticleList (ctx: Context): Promise<void> {
  const validatedResult = RequestQueryString.decode(ctx.query)
  if (validatedResult.isLeft()) {
    ctx.throw(400, 'bad request')
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

    const { index, amount, tag, sort, ascending } = validatedResult.value
    const tasks: any[] = []
    if (!isAdmin) {
      tasks.push({
        $match: {
          deleted: false
        }
      })
    }
    if (tag !== undefined) {
      tasks.push({
        $match: {
          tags: {
            $in: [tag, 'tags']
          }
        }
      })
    }
    if (sort !== undefined) {
      if (sort === 'publish') {
        tasks.push({
          $sort: {
            _id: ascending ? 1 : -1
          }
        })
      } else if (sort === 'views') {
        tasks.push({
          $sort: {
            viewCount: ascending ? 1 : -1
          }
        })
      } else if (sort === 'comments') {
        tasks.push(
          {
            $project: {
              commentCount: { $size: { $ifNull: ['$comments', []] } }
            }
          },
          {
            $sort: { commentCount: ascending ? 1 : -1 }
          }
        )
      } else {
        ctx.throw(400, 'bad request')
        return
      }
    }
    if (index !== undefined) {
      if (+index >= 0) {
        tasks.push({
          $skip: +index
        })
      } else {
        ctx.throw(400, 'bad request')
        return
      }
    }
    if (amount !== undefined) {
      if (+amount > 0) {
        tasks.push({
          $limit: +amount
        })
      } else {
        ctx.throw(400, 'bad request')
        return
      }
    } else {
      tasks.push({
        $limit: 10
      })
    }
    const articles: any[] = await Article.aggregate(tasks).exec()
    ctx.status = 200
    ctx.body = {
      articlesId: articles.map((doc: any) => doc._id)
    }
    return
  }
}

export default getArticleList
