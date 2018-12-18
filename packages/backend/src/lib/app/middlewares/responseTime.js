const responseTime = require('response-time')
const createLog = require('../../../utilities/log')

const log = createLog('responseTimeMiddleware')

module.exports = function createResponseTimeMiddleware(
  { warnLimit = 200 } = {}
) {
  return responseTime((req, res, time) => {
    const message = `${res.locals.id}: ${req.method} ${req.url} Took: ${time}`
    if (time > warnLimit) {
      log.warning(message)
    } else {
      log.info(message)
    }
  })
}
