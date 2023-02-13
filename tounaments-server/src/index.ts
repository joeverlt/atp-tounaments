import dotenv from 'dotenv'
import Server from './server'
import mongoose from 'mongoose'
import { scrapper } from './scrapper'
import Tournament from './app/models/tournament'
import Tokenize from './app/utils/tokenize'

dotenv.config()

const config = {
  name: process.env.APP_NAME,
  host: process.env.HOST,
  port: process.env.PORT,
  dbUser: process.env.DATABASE_USER,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  dbHost: process.env.DATABASE_HOST,
  dbPort: process.env.DATABASE_PORT
}

const server = new Server({ config })
server.start().then(async () => {
  const {
    dbUser: user,
    dbPassword: password,
    dbName: database,
    dbHost: host,
    dbPort: port
  } = config

  try {
    const url = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin&directConnection=true&ssl=false`
    mongoose.set('strictQuery', false)
    await mongoose.connect(url)
    console.log('Database connected')
    const initialData = await scrapper()
    await Tournament.deleteMany()
    await Tournament.insertMany(initialData)
    console.log('Initial data has been successfully created')
  } catch (error) {
    console.log('Error: ', error)
  }
})
