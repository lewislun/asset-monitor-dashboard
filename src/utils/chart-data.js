import Decimal from 'decimal.js'

// /**
//  * @param {object[]} dataArr
//  * @param {object} opts
//  * @param {string} opts.xFieldName
//  * @param {string} [opts.yFieldName]
//  * 
//  */
// export function parseApexChartData(dataArr, opts) {
// 	return {
// 		series: [{
// 			data: dataArr.map(item => ({ x: parseValue(item[opts.xFieldName]), y: parseValue(item[opts.yFieldName]) })),
// 		}],
// 		xaxis: { type: 'category' },
// 	}
// }

/**
 * Data for Pie/Donuts/RadialBars.
 * @param {object[]} dataArr
 * @param {string} labelFieldName
 * @param {string} valueFieldName
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