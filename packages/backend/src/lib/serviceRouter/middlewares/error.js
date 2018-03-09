const sanitizeBackendError = require('common/src/error/errorFactories/sanitizeBackendError')
const createLog = require('../../../utilities/log')

const log = createLog('errorMiddleware')

module.exports = function createErrorMiddleware({ config }) {
  /* eslint-disable no-unused-vars */
  return (incomingError, req, res, next) => {
    /* eslint-enable no-unused-vars */
    const err = sanitizeBackendError({
      error: incomingError,
      log,
    })

    if (config.log.error) {
      // add method to print error
      log.err(
        `${res.locals.id}: Got api error: ${err.title} \n ${JSON.stringify(
          err,
          null,
          2
        )} \n ${incomingError.stack}`
      )
    }

    res.setHeader('Content-Type', 'application/vnd.api+json')
    res.status(err.status || 500)
    return res.send(err)
  }
}
