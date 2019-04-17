import Router from 'koa-router'
import * as controller from '@controllers/users'

const router: Router = new Router()

router.post('/login', controller.login)
router.get('/info/:userId', controller.getUser)

export default router
