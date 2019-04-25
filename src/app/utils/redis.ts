import Redis from 'ioredis'
import { redis as config } from '@/config.json'

const uriString: string = `redis://${
  process.env.NODE_ENV === 'docker' ? 'redis' : config.host
}:${config.port}`
const redis: Redis.Redis = new Redis(uriString, {
  lazyConnect: true,
  family: 4
})

export async function connect (): Promise<void> {
  try {
    await redis.connect()
    console.log(`Redis default connection open to ${uriString}`)
    process.on('exit', async function (): Promise<void> {
      redis.disconnect()
      console.log('Redis default connection closed through app termination')
      process.exit(0)
    })
  } catch (error) {
    console.log(`Redis default connection error: ${error}`)
    throw error
  }
}

export default redis
