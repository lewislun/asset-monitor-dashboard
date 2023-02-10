module.exports = {
	apps : [
		{
			name: 'asset-monitor-dashboard',
			script: 'node .',
			max_memory_restart: '256M',
			combine_logs: true,
		},
		{
			name: 'asset-monitor-dashboard-dev',
			script: 'node .',
			max_memory_restart: '256M',
			combine_logs: true,
			watch: ['src'],
		},
	],
}