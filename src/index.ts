import app from '@/app'
import { connect as connectDB } from '@utils/db'
import { connect as connectRedis } from '@utils/redis'

async function start (): Promise<void> {
  await connectDB()
  await connectRedis()
  app.listen(8787, () => {
    console.log('server is listening on http://localhost:8787')
  })
}

Promise.resolve(start()).catch((error: any) => {
  console.log(error)
  process.exit(1)
})
