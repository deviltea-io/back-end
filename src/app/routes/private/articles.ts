import Router from 'koa-router'

import * as users from '@controllers/users'

const router: Router = new Router()

router.post('/', users.isAdmin)
router.patch('/:articleId', users.isAdmin)
router.delete('/:articleId', users.isAdmin)
router.post('/:articleId/comments', users.isMember)
router.patch('/:articleId/comments/:commentId', users.isMember)
router.delete('/:articleId/comments/:commentId', users.isMember)

export default router
