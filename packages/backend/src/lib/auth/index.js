const Keycloak = require('keycloak-connect')
const session = require('express-session')

const createLog = require('../../utilities/log')

const log = createLog('keycloakMiddleware')

module.exports = function setupAuth({ config } = {}) {
  const memoryStore = new session.MemoryStore()
  log.info('Setup auth')
  if (!config.auth.active) {
    log.scope().warning('Auth disabled, not initializing keycloak')
    return null
  }

  log.scope().info('Auth active, initializing keycloak')
  const keycloak = new Keycloak({ memoryStore }, config.auth)
  log.scope().info('Keycloak initialized')
  keycloak.accessDenied = (req, res) => {
    log.info(`${res.locals.id}: Access denied (403) ${req.method} - ${req.url}`)
    res.status(403)
    res.send({
      ERROR_CODE: 'ACCESS_DENIED',
    })
  }

  return keycloak
}
