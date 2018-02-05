const Keycloak = require('keycloak-connect')

module.exports = function createKeycloak({ config }) {
  const keycloak = new Keycloak({}, config.auth)
  keycloak.accessDenied = (req, res) => {
    res.status(403)
    res.send({
      ERROR_CODE: 'ACCESS_DENIED',
    })
  }
  return keycloak
}
