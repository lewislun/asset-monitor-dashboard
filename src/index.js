import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import Knex from 'knex'
import { Model } from 'objection'

import knexfile from '../knexfile.js'
import { createLogger, morganMiddleware } from './utils/index.js'
import rootRouter from './routers/index.js'

// DB config
const knex = Knex(knexfile)
Model.knex(knex)

const app = express()
const logger = createLogger('app')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// HTTP logs
app.use(morganMiddleware)

// Views
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'pug')

// Router
app.use('/', rootRouter)

export { app }
export { default as env }from './env.js'
export * from './utils/index.js'