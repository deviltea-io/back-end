import koaCors from 'koa2-cors'
import { Middleware } from 'koa-compose'
import { ParameterizedContext } from 'koa'

const cors: Middleware<ParameterizedContext<any, {}>> = koaCors({
  origin: 'http://localhost:3000',
  credentials: true
})

export default cors
