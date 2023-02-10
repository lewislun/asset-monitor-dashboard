import fs from 'fs'
import path from 'path'

import yaml from 'js-yaml'

import { createLogger } from './utils/index.js'

// load file
const logger = createLogger('env')
const envFilePath = './env.yaml'
logger.info(`Loading environment file from path: ${path.resolve(envFilePath)}`)
const envObj = yaml.load(fs.readFileSync(envFilePath, 'utf8'))
logger.info(`Environment file loaded successfully.`)

export default {
    APP_NAME: envObj.appName ?? 'undefined',
    PORT: envObj.port ?? 3000,
    PUBLIC_FOLDER_PATH: envObj.publicFolderPath ?? 'public',
}