const createLog = require('../../../utilities/log')

const log = createLog('errorHandler')
/* eslint-disable no-unused-vars */
function errorMiddleware(err, req, res, next) {
  /* eslint-enable no-unused-vars */

  log.err(err.stack)
  return res.status(500).send(err.message)
}

const notFoundMiddleware = (req, res) => {
  const message = `Fallthrough - no matching route for: ${req.method} - ${
    req.url
  }`
  log.info(message)
  res.status(404)
  res.send({
    ERROR_CODE: 'NOT_FOUND',
    message,
  })
}

module.exports = function createErrorHandler() {
  return [notFoundMiddleware, errorMiddleware]
}
