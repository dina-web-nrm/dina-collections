const captureFlagFromArgs = require('./captureFlagFromArgs')
const getAvailableServerNames = require('./getAvailableServerNames')

module.exports = function captureServerNameFromArgs() {
  const serverName = captureFlagFromArgs({
    flag: '-s',
  })

  if (!serverName) {
    throw new Error(`Server name not provided. Provide with -s `)
  }
  const availableServerNames = getAvailableServerNames()

  if (!availableServerNames.includes(serverName)) {
    throw new Error(
      `Invalid server name: "${serverName}" not found in script env`
    )
  }

  return serverName
}
