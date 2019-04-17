import app from '@/app'
import connectDB from './connectDB'

async function start (): Promise<void> {
  await connectDB()
  app.listen(8787, () => {
    console.log('server is listening on http://localhost:8787')
  })
}

Promise.resolve(start()).catch((error: any) => {
  console.log(error)
  process.exit(1)
})
