const Keycloak = require('keycloak-connect')

const createLog = require('../../../../utilities/log')

const log = createLog('keycloakMiddleware')

const createInactiveMiddleware = () => {
  return function inactiveMiddleware(req, res, next) {
    next()
  }
}

module.exports = function createKeycloak({ config } = {}) {
  if (!config.auth.active) {
    log.info('Auth disabled, creating inactive middleware')
    return createInactiveMiddleware()
  }

  log.info('Auth active, creating keycloak middleware')
  const keycloak = new Keycloak({}, config.auth)
  keycloak.accessDenied = (req, res) => {
    res.status(403)
    res.send({
      ERROR_CODE: 'ACCESS_DENIED',
    })
  }
  return keycloak.middleware
}
