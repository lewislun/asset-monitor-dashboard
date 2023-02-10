import express from 'express'
import { analytics } from 'asset-monitor'

import { parseApexLabelValueData, parseApexXYData } from '../utils/index.js'
import env from '../../env.js'

const router = express.Router()

router.get('/', async (req, res) => {
	const [
		totalValueByStateData,
		totalValueByCodeData,
		totalValueByChainData,
		totalValueByWalletTypeData,
	] = await Promise.all([
		await analytics.getTotalValue({ groupBy: 'state' }),
		await analytics.getTotalValue({ groupBy: 'code' }),
		await analytics.getTotalValue({ groupBy: 'chain' }),
		await analytics.getTotalValue({ groupBy: 'tag', tagCategory: 'walletType' }),
	])
	res.render('pages/dashboard/summary', {
		env,
		totalValueByStateData: parseApexLabelValueData(totalValueByStateData, 'state', 'usdValue', { sortField: 'usdValue' }),
		totalValueByCodeData: parseApexXYData(totalValueByCodeData, 'code', 'usdValue', { sortField: 'usdValue' }),
		totalValueByChainData: parseApexLabelValueData(totalValueByChainData, 'chain', 'usdValue', { sortField: 'usdValue' }),
		totalValueByWalletTypeData: parseApexLabelValueData(totalValueByWalletTypeData, 'tagValue', 'usdValue'),
	})
})

export default router