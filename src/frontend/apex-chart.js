import ApexCharts from 'apexcharts'

document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll('.apex-chart').forEach(el => {
		const chartOpts = JSON.parse(el.getAttribute('data-chart-opts'))
		console.log(chartOpts)
		new ApexCharts(el, chartOpts).render()
	})
})