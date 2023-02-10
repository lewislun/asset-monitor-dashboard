import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import sass from 'sass'

import env from '../env.js'
import { createLogger } from '../index.js'

const logger = createLogger('sass')

async function writeFile(outputPath, content) {
    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
        await fs.promises.mkdir(dir, { recursive: true })
    }
    return fs.promises.writeFile(outputPath, content)
}

// Paths
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const entryPath = path.resolve(__dirname, '..', env.SCSS_ENTRY_PATH)
const distPath = path.resolve(__dirname, '..', env.SCSS_DIST_PATH)
const sourceMapDistPath = distPath + '.map'

// Compile SCSS
logger.info(`Building SCSS from ${entryPath}.`)
const result = await sass.compileAsync(entryPath, { sourceMap: true })

// Write to files
logger.info(`Writing CSS to ${distPath}.`)
await writeFile(distPath, result.css)
logger.info(`Writing CSS source map to ${sourceMapDistPath}.`)
await writeFile(sourceMapDistPath, result.sourceMap.mappings)