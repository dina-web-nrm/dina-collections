const path = require('path')
const getServerEnvVariable = require('./getServerEnvVariable')

// doing this the same way as in 'ssh-exec'
const HOME = process.env.HOME || process.env.USERPROFILE

module.exports = function getServerKeyFile(serverName) {
  const serverKeyFilePath = getServerEnvVariable({
    serverName,
    variableName: 'SERVER_KEY_FILE',
  })

  return path.join(HOME, serverKeyFilePath)
}
