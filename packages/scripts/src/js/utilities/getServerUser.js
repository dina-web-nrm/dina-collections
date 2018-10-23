const getServerEnvVariable = require('./getServerEnvVariable')

module.exports = function getServerUser(server) {
  return getServerEnvVariable({ server, variableName: 'SERVER_USER' })
}
