import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import Knex from 'knex'
import { Model } from 'objection'
import { AssetSnapshotBatch, analytics } from 'asset-monitor'

import knexfile from '../knexfile.js'
import { createLogger, morganMiddleware, parseApexLabelValueData } from './utils/index.js'
import env from './env.js'

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

// Ping
app.get('/ping', async (req, res) => res.send('pong'))

// Main page
app.get('/', async (req, res) => {
	const [ totalValueByStateData, totalValueByCodeData, totalValueByChainData ] = await Promise.all([
		await analytics.getTotalValue({ groupBy: 'state' }),
		await analytics.getTotalValue({ groupBy: 'code' }),
		await analytics.getTotalValue({ groupBy: 'chain' }),
	])
	res.render('pages/dashboard', {
		env,
		totalValueByStateData: parseApexLabelValueData(totalValueByStateData, 'state', 'usdValue'),
		totalValueByCodeData: parseApexLabelValueData(totalValueByCodeData, 'code', 'usdValue'),
		totalValueByChainData: parseApexLabelValueData(totalValueByChainData, 'chain', 'usdValue')
	})
})

export { app }
export { default as env }from './env.js'
export * from './utils/index.js'