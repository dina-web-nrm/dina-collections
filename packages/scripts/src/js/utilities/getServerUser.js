const getServerEnvVariable = require('./getServerEnvVariable')

module.exports = function getServerUser(serverName) {
  return getServerEnvVariable({ serverName, variableName: 'SERVER_USER' })
}
