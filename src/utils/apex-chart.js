import Decimal from 'decimal.js'

/**
 * @typedef {import('apexcharts').ApexOptions} ApexOptions
 * 
 * @typedef XYDataExtraOpts
 * @property {object} [xAxisType=category]
 * @property {string} [nameField]
 * @property {string} [sortField]
 * @property {SortOrder} [sortOrder=desc]
 * 
 * @typedef LabelValueDataExtraOpts
 * @property {string} [sortField]
 * @property {SortOrder} [sortOrder=desc]
 */

/**
 * @enum {string}
 */
export const SortOrder = {
	ASC: 'asc',
	DESC: 'desc',
}

/**
 * @param {object[]} dataArr
 * @param {string} labelField
 * @param {string} valueField
 * @param {LabelValueDataExtraOpts} [opts={}]
 * @returns {ApexOptions}
 */
export function parsePieChartOpts(dataArr, labelField, valueField, opts = {}) {
	return {
		...parseLabelValueData(dataArr, labelField, valueField, opts),
		chart: { type: 'pie' },
		legend: { show: false },
	}
}

/**
 * @param {object[]} seriesData
 * @param {string} xField
 * @param {string} yField
 * @param {LabelValueDataExtraOpts} [opts={}]
 * @returns {ApexOptions}
 */
export function parseTreemapOpts(seriesData, xField, yField, opts = {}) {
	return {
		...parseXYData([seriesData], xField, yField, opts),
		chart: { type: 'treemap' },
		legend: { show: false },
	}
}

/**
 * @param {object[][]} seriesDataArr
 * @param {string} xField
 * @param {string} yField
 * @param {XYDataExtraOpts} [opts={}]
 * @returns {ApexOptions}
 */
export function parseAreaChartOpts(seriesDataArr, xField, yField, opts = {}) {
	return {
		...parseXYData(seriesDataArr, xField, yField, opts),
		chart: {
			type: 'area',
			stacked: true,
		},
		legend: { show: false },
		stroke: { curve: 'smooth' },
		dataLabels: { enabled: false },
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.6,
				opacityTo: 0.8,
			}
		},
	}
}

/**
 * @param {object[][]} seriesDataArr
 * @param {string} xField
 * @param {string} yField
 * @param {XYDataExtraOpts} [opts={}]
 * @returns {ApexOptions}
 */
export function parseXYData(seriesDataArr, xField, yField, opts = {}) {
	if (opts?.sortField) {
		seriesDataArr = seriesDataArr.map(seriesData => sortArr(seriesData, opts.sortField, opts.sortOrder))
	}
	return {
		series: seriesDataArr.map(seriesData => ({
			name: seriesData[0]?.[opts?.nameField],
			data: seriesData.map(item => ({ x: parseValue(item[xField]), y: parseValue(item[yField]) })),
		})),
		xaxis: { type: opts?.xAxisType ?? 'category' },
	}
}

/**
 * Data for Pie/Donuts/RadialBars.
 * @param {object[]} dataArr
 * @param {string} labelField
 * @param {string} valueField
 * @param {LabelValueDataExtraOpts} [opts={}]
 * @returns {ApexOptions}
 */
export function parseLabelValueData(dataArr, labelField, valueField, opts = {}) {
	if (opts?.sortField) sortArr(dataArr, opts.sortField, opts.sortOrder)
	return {
		series: dataArr.map(item => parseValue(item[valueField])),
		labels: dataArr.map(item => parseValue(item[labelField])),
	}
}

/**
 * This function mutates the array.
 * @template T
 * @param {T[]} arr
 * @param {string} field
 * @param {SortOrder} [order=desc]
 * @returns {T[]}
 */
function sortArr(arr, field, order = SortOrder.DESC) {
	if (order === SortOrder.ASC) {
		return arr.sort((a, b) => a[field] - b[field])
	} else {
		return arr.sort((a, b) => b[field] - a[field])
	}
}

/**
 * @param {any} value
 */
function parseValue(value) {
	switch (true) {
		case value instanceof Decimal:
			return value.toNumber()
	}
	return value
}