const createLog = require('../../../utilities/log')

const log = createLog('errorMiddleware')

module.exports = function createErrorMiddleware({ config }) {
  /* eslint-disable no-unused-vars */
  return (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    // ensure know error or pass on other error

    if (config.log.error) {
      log.err(`Got api error: ${err.stack} \n ${JSON.stringify(err, null, 2)}`)
    }

    if (err.status === 400) {
      res.status(400)
      return res.send({
        errors: err.errors,
        message: err.message || err.stack,
        originalKey: err.name,
      })
    }

    if (err.status === 404) {
      res.status(404)
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
