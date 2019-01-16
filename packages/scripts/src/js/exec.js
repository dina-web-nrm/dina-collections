const localExecScript = require('./utilities/localExecScript')
const remoteExecScript = require('./utilities/remoteExecScript')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')

const serverName = captureServerNameFromArgs()

if (serverName === 'local') {
  localExecScript()
} else {
  remoteExecScript({
    server: serverName.toUpperCase(),
  })
}
