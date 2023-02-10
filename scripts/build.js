import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import sass from 'sass'
import esbuild from 'esbuild'

import env from '../env.js'
import { createLogger } from '../index.js'

const logger = createLogger('build')

async function writeFile(outputPath, content) {
	const dir = path.dirname(outputPath)
	if (!fs.existsSync(dir)) {
		await fs.promises.mkdir(dir, { recursive: true })
	}
	await fs.promises.writeFile(outputPath, content)
}

export async function buildScss() {
	// Paths
	const __dirname = path.dirname(fileURLToPath(import.meta.url))
	const entryPath = path.resolve(__dirname, '..', env.SCSS_ENTRY_PATH)
	const distPath = path.resolve(__dirname, '..', env.SCSS_DIST_PATH)
	const sourceMapDistPath = distPath + '.map'

	// Compile SCSS
	logger.info(`Building SCSS from ${entryPath}.`)
	const result = await sass.compileAsync(entryPath, { sourceMap: true })

	// Write to files
	logger.info(`Writing CSS files - distPath: ${distPath}, sourceMapDistPath: ${sourceMapDistPath}`)
	await Promise.all([
		writeFile(distPath, result.css),
		writeFile(sourceMapDistPath, result.sourceMap.mappings),
	])
}

export async function buildFrontendJs() {
	// Paths
	const __dirname = path.dirname(fileURLToPath(import.meta.url))
	const entryPath = path.resolve(__dirname, '..', env.FRONTEND_JS_ENTRY_PATH)
	const distPath = path.resolve(__dirname, '..', env.FRONTEND_JS_DIST_PATH)

	// Compile JS
	logger.info(`Building Frontend JS files from ${entryPath}.`)
	await esbuild.build({
		entryPoints: [ entryPath ],
		minify: true,
		sourcemap: true,
		bundle: true,
		outfile: distPath,
	})
}