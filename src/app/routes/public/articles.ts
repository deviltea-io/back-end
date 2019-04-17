import Router from 'koa-router'

const router: Router = new Router()

router.get('/')
router.get('/:articleId')
router.post('/:articleId/views/count')
router.get('/:articleId/comments')
router.get('/:articleId/comments/count')
router.get('/:articleId/comments/:commentId')

export default router
