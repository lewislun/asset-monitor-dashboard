import { buildFrontendJs, buildScss } from './build.js'
import { start } from '../index.js'

const action = process.argv[2]
switch (action) {
    case 'start':
        start()
    case 'dev':
        await Promise.all([ buildFrontendJs(), buildScss() ])
        start()
}