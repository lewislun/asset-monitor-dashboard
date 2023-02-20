import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import { Model } from 'objection'

import env from '../../env.js'
import { knex } from '../db/index.js'
import { createLogger, morganMiddleware } from './utils/index.js'
import rootRouter from './routers/index.js'

const app = express()
const logger = createLogger('app')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// DB config
Model.knex(knex)

// HTTP logs
app.use(morganMiddleware)

// Views
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'pug')

// Router
app.use('/', rootRouter)

export * from './utils/index.js'
export { app }
export function start() {
	app.listen(env.PORT, () => logger.info(`Started listening on ${env.PORT}.`))
}