import express, { Application } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { createServer } from 'http'
import ws from './modules/web-socket'

config()

const app: Application = express()
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
const server = createServer(app)

server.listen(process.env.port, () => {
  console.log(`Server running on port ${process.env.port}`)
})

ws(server)