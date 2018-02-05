import { createLogger } from 'redux-logger'

const getLoggerMiddleware = () => {
  if (process.env.NODE_ENV === 'development') {
    return createLogger
  }
  return null
}

const name = 'logger'
const middleware = getLoggerMiddleware()

export { name, middleware }
