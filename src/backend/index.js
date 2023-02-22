import path from 'path'
import { fileURLToPath } from 'url'

import Knex from 'knex'
import express from 'express'
import session from 'express-session'
import { Model } from 'objection'
// import passport from 'passport'

import env from '../../env.js'
import knexfile from '../../knexfile.js'
import { createLogger, morganMiddleware, setLogLevel } from './utils/index.js'
import rootRouter from './routers/index.js'

setLogLevel('debug')
const app = express()
const logger = createLogger('app')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// DB config
const knex = Knex(knexfile)
Model.knex(knex)

// Session
app.use(session({
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true },
}))

// Auth by session
// app.use(passport.authenticate('session'))

// HTTP logs
app.use(morganMiddleware)

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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