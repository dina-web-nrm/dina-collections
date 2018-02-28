const Keycloak = require('keycloak-connect')

const createInactiveMiddleware = () => {
  return function inactiveMiddleware(req, res, next) {
    next()
  }
}

module.exports = function createKeycloak({ config } = {}) {
  if (!config.auth.active) {
    return createInactiveMiddleware()
  }
  const keycloak = new Keycloak({}, config.auth)
  keycloak.accessDenied = (req, res) => {
    res.status(403)
    res.send({
      ERROR_CODE: 'ACCESS_DENIED',
    })
  }
  return keycloak.middleware
}
