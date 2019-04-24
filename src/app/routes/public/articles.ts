import Router from 'koa-router'
import * as articles from '@controllers/articles'

const router: Router = new Router()

router.get('/', articles.getArticleList)
router.get('/:articleId/info', articles.getArticleInfo)
router.post('/:articleId/content', articles.getArticleContent)
router.post('/:articleId/views/count', articles.increaseViewCount)
router.get('/:articleId/comments')
router.get('/:articleId/comments/count')
router.get('/:articleId/comments/:commentId')

export default router
