import ApexCharts from 'apexcharts'

let chartCount = 0

document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll('.apex-chart').forEach(el => {
		const delayMs = 500 * chartCount++
		setTimeout(() => {
			const chartOpts = JSON.parse(el.getAttribute('data-chart-opts'))
			new ApexCharts(el, chartOpts).render()
		}, delayMs)
	})
})