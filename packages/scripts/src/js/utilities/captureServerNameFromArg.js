const getAvailableServerNames = require('./getAvailableServerNames')

module.exports = function captureServerNameFromArg() {
  const inputArgs = process.argv.slice(2)
  let serverName = ''
  inputArgs.forEach((arg, index) => {
    const serverNameIndex = index + 1
    if (arg === '-s' && serverNameIndex < inputArgs.length) {
      serverName = inputArgs[serverNameIndex]
    }
  })

  if (!serverName) {
    throw new Error(`Server name not provided`)
  }
  const availableServerNames = getAvailableServerNames()

  if (!availableServerNames.includes(serverName)) {
    throw new Error(
      `Invalid server name: "${serverName}" not found in script env`
    )
  }

  return serverName
}
