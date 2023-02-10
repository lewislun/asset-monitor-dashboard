import express from 'express'
import { analytics } from 'asset-monitor'

import { apexChart } from '../utils/index.js'
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
		totalValueByStateOpts: apexChart.parsePieChartOpts(totalValueByStateData, 'state', 'usdValue', { sortField: 'usdValue' }),
		totalValueByCodeOpts: apexChart.parseTreemapOpts(totalValueByCodeData, 'code', 'usdValue', { sortField: 'usdValue' }),
		totalValueByChainOpts: apexChart.parsePieChartOpts(totalValueByChainData, 'chain', 'usdValue', { sortField: 'usdValue' }),
		totalValueByWalletTypeOpts: apexChart.parsePieChartOpts(totalValueByWalletTypeData, 'tagValue', 'usdValue'),
	})
})

export default router