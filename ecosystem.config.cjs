module.exports = {
	apps : [
		{
			name: 'asset-monitor-dashboard',
			script: 'node --require=suppress-experimental-warnings ./scripts/entry.js start',
			max_memory_restart: '256M',
			combine_logs: true,
		},
		{
			name: 'asset-monitor-dashboard-watch',
			script: 'node --require=suppress-experimental-warnings ./scripts/entry.js dev',
			max_memory_restart: '256M',
			combine_logs: true,
			watch: ['src', 'scripts'],
		},
	],
}