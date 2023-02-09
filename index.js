import { app, createLogger, env } from './src/index.js'

const logger = createLogger(env.APP_NAME)
app.listen(env.PORT, () => logger.info(`Started listening on ${env.PORT}.`))