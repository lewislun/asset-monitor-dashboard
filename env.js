import fs from 'fs'
import path from 'path'

import yaml from 'js-yaml'

import { createLogger } from './src/utils/index.js'

// load file
const logger = createLogger('env')
const envFilePath = './env.yaml'
logger.info(`Loading environment file from path: ${path.resolve(envFilePath)}`)
const envObj = yaml.load(fs.readFileSync(envFilePath, 'utf8'))
logger.info(`Environment file loaded successfully.`)

export default {
    /** @type {string} */
    APP_NAME: envObj.appName ?? 'undefined',
    /** @type {number} */
    PORT: envObj.port ?? 3000,
    /** @type {string} */
    PUBLIC_FOLDER_PATH: envObj.publicFolderPath ?? 'public',

    /** @type {string} */
    SCSS_ENTRY_PATH: envObj.scssEntryPath ?? undefined,
    /** @type {string} */
    SCSS_DIST_PATH: envObj.scssDistPath ?? undefined,
    /** @type {string} */
    FRONTEND_JS_ENTRY_PATH: envObj.frontendJsEntryPath ?? undefined,
    /** @type {string} */
    FRONTEND_JS_DIST_PATH: envObj.frontendJsDistPath ?? undefined,
}