const createLog = require('../../../utilities/log')

const log = createLog('authorizeMiddleware')

module.exports = function createAuthorizeMiddleware({ auth, config }) {
  if (!config.auth.active) {
    log.info('Auth disabled, creating inactive middleware')
    return (req, res, next) => {
      log.debug(`${res.locals.id}: Specific auth not implemented`)
      next()
    }
  }

  if (!auth) {
    throw new Error('Auth not provided but config.auth.active is true')
  }

  return auth.protect()
}
