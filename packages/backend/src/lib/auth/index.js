const Keycloak = require('keycloak-connect')

const createLog = require('../../utilities/log')

const log = createLog('keycloakMiddleware')

module.exports = function setupAuth({ config } = {}) {
  log.info('Setup auth')
  if (!config.auth.active) {
    log.scope().warning('Auth disabled, not initializing keycloak')
    return null
  }

  log.scope().info('Auth active, initializing keycloak')
  const keycloak = new Keycloak({}, config.auth)
  log.scope().info('Keycloak initialized')
  keycloak.accessDenied = (req, res) => {
    res.status(403)
    res.send({
      ERROR_CODE: 'ACCESS_DENIED',
    })
  }

  return keycloak
}
