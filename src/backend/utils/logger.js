import winston from 'winston'
import morgan from 'morgan'

/** @type {winston.Logger[]} */
const loggers = []
let defaultLogLevel = 'http'

winston.addColors({
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'cyan',
	debug: 'grey',
})

/**
 * @param {string} level
 */
export function setLogLevel(level) {
	loggers.forEach(logger => logger.level = level)
	defaultLogLevel = level
}

/**
 * @param {string} [moduleName=default]
 * @returns {winston.Logger}
 */
export function createLogger(moduleName = 'default') {
	const logger = winston.createLogger({
		level: defaultLogLevel,
		transports: [
			new winston.transports.Console(),
		],
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.timestamp(),
			winston.format.printf(({ level, timestamp, message }) => `[${level}] ${timestamp} - ${moduleName}: ${message}`),
		),
	})
	loggers.push(logger)
	return logger
}

// default logger
const logger = createLogger()
export default logger

// morgan
const httpLogger = createLogger('http')
const morganMiddleware = morgan(
	':remote-addr :method :url :status :res[content-length] - :response-time ms',
	{
		stream: {
			write: msg => httpLogger.http(msg)
		},
	}
)
export { morganMiddleware }