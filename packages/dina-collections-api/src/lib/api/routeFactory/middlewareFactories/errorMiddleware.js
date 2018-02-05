const createLog = require('../../../../utilities/log')

const log = createLog('errorMiddleware')

module.exports = function createErrorMiddleware({ apiConfig }) {
  /* eslint-disable no-unused-vars */
  return (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    // ensure know error or pass on other error

    if (apiConfig.log.error) {
      log.err(`Got api error: ${err.stack}`)
    }

    if (err.status === 400) {
      res.status(400)
      return res.send({
        errors: err.errors,
        message: err.message || err.stack,
        originalKey: err.name,
      })
    }
    res.status(500)
    return res.send({
      errors: err.errors,
      message: err.message || err.stack,
      originalKey: err.name,
    })
  }
}
