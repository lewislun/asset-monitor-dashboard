import Decimal from 'decimal.js'

/**
 * @typedef {import('apexcharts').ApexOptions} ApexOptions
 */

/**
 * @param {object[]} dataArr
 * @param {string} xFieldName
 * @param {string} yFieldName
 * @param {object} [opts={}]
 * @param {object} [xAxisType=category]
 * @returns {ApexOptions}
 */
export function parseApexXYData(dataArr, xFieldName, yFieldName, opts = {}) {
	return {
		series: [{
			data: dataArr.map(item => ({ x: parseValue(item[xFieldName]), y: parseValue(item[yFieldName]) })),
		}],
		xaxis: { type: opts?.xAxisType ?? 'category' },
	}
}

/**
 * Data for Pie/Donuts/RadialBars.
 * @param {object[]} dataArr
 * @param {string} labelFieldName
 * @param {string} valueFieldName
 * @returns {}
 */
export function parseApexLabelValueData(dataArr, labelFieldName, valueFieldName) {
	return {
		series: dataArr.map(item => parseValue(item[valueFieldName])),
		labels: dataArr.map(item => parseValue(item[labelFieldName])),
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