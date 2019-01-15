const getAvailableServerNames = require('./utilities/getAvailableServerNames')
const localExecScript = require('./utilities/localExecScript')
const remoteExecScript = require('./utilities/remoteExecScript')
const captureServerNameFromArg = require('./utilities/captureServerNameFromArg')

const serverName = captureServerNameFromArg()
if (!serverName) {
  throw new Error(`Server name not provided`)
}

const availableServerNames = getAvailableServerNames()

if (!availableServerNames.includes(serverName)) {
  throw new Error(
    `Invalid server name: "${serverName}" not found in script env`
  )
}

if (serverName === 'local') {
  localExecScript()
} else {
  remoteExecScript({
    server: serverName.toUpperCase(),
  })
}
