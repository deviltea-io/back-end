import Router from 'koa-router'
import * as controller from '@controllers/users'

const router: Router = new Router()

router.post('/auth', controller.auth)

export default router
