import Router from 'koa-router'
import * as controller from '@controllers/users'

const router: Router = new Router()

router.post('/auth', controller.isMember, controller.auth)
router.post('/logout', controller.isMember, controller.logout)

export default router
