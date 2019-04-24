import Router from 'koa-router'

import * as users from '@controllers/users'
import * as articles from '@controllers/articles'

const router: Router = new Router()

router.post('/', users.isAdmin, articles.createArticle)
router.patch('/:articleId', users.isAdmin, articles.updateArticle)
router.delete('/:articleId', users.isAdmin, articles.deleteArticle)
router.post('/:articleId/comments', users.isMember)
router.patch('/:articleId/comments/:commentId', users.isMember)
router.delete('/:articleId/comments/:commentId', users.isMember)

export default router
