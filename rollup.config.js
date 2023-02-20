import nodeResolve from '@rollup/plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import rollupScss from 'rollup-plugin-scss'

import env from './env.js'

/** @type {import('rollup').RollupOptions[]} */
export default [
	{
		input: './src/frontend/index.js',
		plugins: [
			nodeResolve(),
			// babel({ babelHelpers: 'bundled' }),
			commonJs(),
			rollupScss({
				fileName: env.CSS_DIST_FILENAME,
				sourceMap: true,
				outputStyle: 'compressed',
			}),
		],
		treeshake: true,
		output: {
			name: 'frontend',
			file: env.DIST_FOLDER_PATH + env.FRONTEND_JS_DIST_FILENAME,
			format: 'umd',
			sourcemap: true,
			// minifyInternalExports: true,
		},
	},
]