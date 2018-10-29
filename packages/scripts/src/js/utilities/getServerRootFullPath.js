const getServerEnvVariable = require('./getServerEnvVariable')

module.exports = function getServerRootFullPath(server) {
  return getServerEnvVariable({ server, variableName: 'SERVER_REPO_ROOT' })
}
