const sanitizeBackendError = require('common/src/error/errorFactories/sanitizeBackendError')
const createLog = require('../../../utilities/log')
const createErrorLogger = require('../../errorLogger')

const log = createLog('errorMiddleware')

module.exports = function createErrorMiddleware({ config }) {
  /* eslint-disable no-unused-vars */
  const errorLogger = createErrorLogger({
    config,
    log,
    origin: 'backend',
  })
  return (incomingError, req, res, next) => {
    /* eslint-enable no-unused-vars */
    errorLogger.log({
      error: incomingError,
      request: req,
      response: res,
    })
    const sanitizedError = sanitizeBackendError({
      error: incomingError,
      isDevelopment: false,
      // isDevelopment: config.env.isDevelopment,
      log,
    })

    res.setHeader('Content-Type', 'application/vnd.api+json')
    res.status(sanitizedError.status || 500)
    return res.send(sanitizedError)
  }
}
