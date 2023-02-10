import express from 'express'
import { analytics } from 'asset-monitor'

import { parseApexLabelValueData } from '../utils/index.js'
import env from '../env.js'

const router = express.Router()

router.get('/', async (req, res) => {
	const [ totalValueByStateData, totalValueByCodeData, totalValueByChainData ] = await Promise.all([
		await analytics.getTotalValue({ groupBy: 'state' }),
		await analytics.getTotalValue({ groupBy: 'code' }),
		await analytics.getTotalValue({ groupBy: 'chain' }),
	])
	res.render('pages/dashboard/summary', {
		env,
		totalValueByStateData: parseApexLabelValueData(totalValueByStateData, 'state', 'usdValue'),
		totalValueByCodeData: parseApexLabelValueData(totalValueByCodeData, 'code', 'usdValue'),
		totalValueByChainData: parseApexLabelValueData(totalValueByChainData, 'chain', 'usdValue')
	})
})

export default router