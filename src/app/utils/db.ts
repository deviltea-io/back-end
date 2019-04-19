import mongoose, { ConnectionOptions } from 'mongoose'
import { db as config } from '@/config.json'

export async function connect (): Promise<void> {
  const uriString: string = `mongodb://${config.user}:${config.pass}@${
    process.env.NODE_ENV === 'docker' ? 'mongo' : config.host
  }:${config.port}/${config.name}`
  interface ExtendedConnectionOptions extends ConnectionOptions {
    family?: number
  }
  const options: ExtendedConnectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    family: 4
  }

  try {
    await mongoose.connect(uriString, options)
    console.log(`Mongoose default connection open to ${uriString}`)
    process.on('exit', async function (): Promise<void> {
      await mongoose.connection.close()
      console.log('Mongoose default connection closed through app termination')
      process.exit(0)
    })
  } catch (error) {
    console.log(`Mongoose default connection error: ${error}`)
    throw error
  }
}
