import Router from 'koa-router'
import articles from '@routes/private/articles'
import users from '@routes/private/users'

const router: Router = new Router({
  prefix: '/api'
})

router.use('/articles', articles.routes(), articles.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())

export default router
