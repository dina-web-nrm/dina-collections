const getServerEnvVariable = require('./getServerEnvVariable')

module.exports = function getServerHost(serverName) {
  return getServerEnvVariable({ serverName, variableName: 'SERVER_HOST' })
}
