const createLog = require('../../../../utilities/log')

const log = createLog('authenticateMiddleware')

const createInactiveMiddleware = () => {
  return function inactiveMiddleware(req, res, next) {
    next()
  }
}

const authPreLogMiddleware = (req, res, next) => {
  log.info('Authenticate start')
  next()
}

const authPostLogMiddleware = (req, res, next) => {
  log.info('Authenticate done')
  next()
}

module.exports = function createAuthenticateMiddleware({ auth, config } = {}) {
  if (!config.auth.active) {
    log.info('Auth disabled, creating inactive middleware')
    return createInactiveMiddleware()
  }

  if (!auth) {
    throw new Error('Auth not provided but config.auth.active is true')
  }

  log.info('Auth active, creating keycloak middleware')
  return [authPreLogMiddleware, auth.middleware(), authPostLogMiddleware]
}
