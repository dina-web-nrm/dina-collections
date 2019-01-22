const getServerEnvVariable = require('./getServerEnvVariable')

module.exports = function getServerRootFullPath(serverName) {
  return getServerEnvVariable({ serverName, variableName: 'SERVER_REPO_ROOT' })
}
