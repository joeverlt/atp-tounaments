import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import Router from './router'

export default class Server {
  public app
  public config
  public router

  constructor({ config }: any) {
    this.app = express()
    this.config = config
    this.router = new Router()
  }

  start() {
    return new Promise(async (resolve: any) => {
      const server = createServer(this.app)

      this.app.use(cors())
      this.app.use(helmet())
      this.app.use(cookieParser())
      this.app.use(
        express.json({
          limit: '250mb'
        })
      )
      this.app.use(
        express.urlencoded({
          limit: '250mb',
          parameterLimit: 500000,
          extended: true
        })
      )

      this.app.use('/api/v1', this.router.getRoutes())

      server.listen(this.config.port, () => {
        console.log(
          `API - ${this.config.name} running on: ${this.config.host}:${this.config.port}`
        )
      })

      resolve()
    })
  }
}
