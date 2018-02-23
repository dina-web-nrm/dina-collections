const createLog = require('../../../utilities/log')

const log = createLog('authenticateMiddleware')

module.exports = function createAuthenticateMiddleware() {
  return (req, res, next) => {
    log.debug(`${res.locals.id}: Specific auth not implemented`)
    next()
  }
}
