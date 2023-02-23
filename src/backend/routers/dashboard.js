import express from 'express'
import { analytics } from 'asset-monitor'

import { apexChart } from '../utils/index.js'

const router = express.Router()

router.get('/', async (req, res) => {
	const [
		// totalValueByStateData,
		// totalValueByCodeData,
		// totalValueByChainData,
		// totalValueByWalletTypeData,
		netFlowByGroupData,
		valueByGroupData,
	] = await Promise.all([
		// await analytics.getTotalValueOverTime({ latestBatchOnly: true, groupBy: 'state' }),
		// await analytics.getTotalValueOverTime({ latestBatchOnly: true, groupBy: 'code' }),
		// await analytics.getTotalValueOverTime({ latestBatchOnly: true, groupBy: 'chain' }),
		// await analytics.getTotalValueOverTime({ latestBatchOnly: true, groupBy: 'tag', tagCategory: 'walletType' }),
		await analytics.getNetFlowOverTime({ }),
		await analytics.getTotalValueOverTime({ groupBy: 'group' })
	])

	res.render('pages/dashboard/summary', {
		// totalValueByStateOpts: apexChart.parsePieChartOpts(totalValueByStateData.flat(1), 'state', 'usdValue', { sortField: 'usdValue' }),
		// totalValueByCodeOpts: apexChart.parseTreemapOpts(totalValueByCodeData.flat(1), 'code', 'usdValue', { sortField: 'usdValue' }),
		// totalValueByChainOpts: apexChart.parseTreemapOpts(totalValueByChainData.flat(1), 'chain', 'usdValue', { sortField: 'usdValue' }),
		// totalValueByWalletTypeOpts: apexChart.parsePieChartOpts(totalValueByWalletTypeData.flat(1), 'tagValue', 'usdValue'),
		netFlowByGroupData: apexChart.parseAreaChartOpts(netFlowByGroupData, 'time', 'usdValue', { nameField: 'groupName', xAxisType: 'datetime' }),
		valueByGroupData: apexChart.parseAreaChartOpts(valueByGroupData, 'time', 'usdValue', { nameField: 'groupName', xAxisType: 'datetime' }),
	})
})

export default router