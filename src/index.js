import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'

import { createLogger, morganMiddleware } from './utils/index.js'

const app = express()
const logger = createLogger('app')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// HTTP logs
app.use(morganMiddleware)

// Views
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'pug')

// Ping
app.get('/ping', (req, res) => {
	res.send('pong')
})

export { app }
export { default as env }from './env.js'
export * from './utils/index.js'