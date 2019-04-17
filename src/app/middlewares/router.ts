import koaJwt from 'koa-jwt'
import compose from 'koa-compose'
import publicRouter from '@routes/public'
import privateRouter from '@routes/private'
import { app as config } from '@/config.json'

const jwt: koaJwt.Middleware = koaJwt({
  secret: config.jwtSecret,
  key: 'jwtData'
})

export default compose([
  publicRouter.routes(),
  publicRouter.allowedMethods(),
  jwt,
  privateRouter.routes(),
  privateRouter.allowedMethods()
])
