import mongoose, { ConnectionOptions } from 'mongoose'

import { db as config } from './config.json'

async function connect (): Promise<void> {
  const uriString: string = `mongodb://${
    process.env.NODE_ENV === 'docker' ? 'mongo' : config.host
  }/${config.name}`
  const options: ConnectionOptions = {
    user: config.user,
    pass: config.pass,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

  try {
    await mongoose.connect(uriString, options)
    console.log(`Mongoose default connection open to ${uriString}`)
    process.on('exit', async function (): Promise<void> {
      await mongoose.connection.close()
      console.log('Mongoose default connection closed through app termination')
      process.exit(0)
    })
  } catch (err) {
    console.log(`Mongoose default connection error: ${err}`)
    throw err
  }
}

export default connect
