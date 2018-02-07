import config from 'config'
import { createLogger } from 'redux-logger'

const getLoggerMiddleware = () => {
  if (config.isDevelopment) {
    return createLogger
  }
  return null
}

const name = 'logger'
const middleware = getLoggerMiddleware()

export { name, middleware }
