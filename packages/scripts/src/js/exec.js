const localExecScript = require('./utilities/localExecScript')
const remoteExecScript = require('./utilities/remoteExecScript')
const captureServerNameFromArg = require('./utilities/captureServerNameFromArg')

const serverName = captureServerNameFromArg()

if (serverName === 'local') {
  localExecScript()
} else {
  remoteExecScript({
    server: serverName.toUpperCase(),
  })
}
