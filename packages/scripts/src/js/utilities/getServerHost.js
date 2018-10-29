const getServerEnvVariable = require('./getServerEnvVariable')

module.exports = function getServerHost(server) {
  return getServerEnvVariable({ server, variableName: 'SERVER_HOST' })
}
