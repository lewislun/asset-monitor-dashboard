import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import sass from 'sass'

import env from '../env.js'
import { createLogger } from '../index.js'

const logger = createLogger('sass')

function writeFile(outputPath, content) {
    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    return fs.writeFileSync(outputPath, content)
}

// Paths
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const entryPath = path.resolve(__dirname, '..', env.SCSS_ENTRY_PATH)
const distPath = path.resolve(__dirname, '..', env.SCSS_DIST_PATH)
const sourceMapDistPath = distPath + '.map'

// Compile SCSS
logger.info(`Building SCSS from ${entryPath}.`)
const result = sass.compile(entryPath, { sourceMap: true })

// Write to files
logger.info(`Writing CSS to ${distPath}.`)
writeFile(distPath, result.css)
logger.info(`Writing CSS source map to ${sourceMapDistPath}.`)
writeFile(sourceMapDistPath, result.sourceMap.mappings)