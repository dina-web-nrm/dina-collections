import config from 'config'
import { createLogger } from 'redux-logger'

const getLoggerMiddleware = () => {
  if (config.reduxLogger.enabled) {
    return () => {
      return createLogger({
        collapsed: true,
        diff: config.reduxLogger.showDiff,
      })
    }
  }
  return null
}

const name = 'logger'
const middleware = getLoggerMiddleware()

export { name, middleware }
