const path = require('path')
const getServerEnvVariable = require('./getServerEnvVariable')

// doing this the same way as in 'ssh-exec'
const HOME = process.env.HOME || process.env.USERPROFILE

module.exports = function getServerKeyFile(serverName) {
  const serverKeyFilePath = getServerEnvVariable({
    required: false,
    serverName,
    variableName: 'SERVER_KEY_FILE',
  })

  if (!serverKeyFilePath) {
    return undefined
  }

  return path.join(HOME, serverKeyFilePath)
}
