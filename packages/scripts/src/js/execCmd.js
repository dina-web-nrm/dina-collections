const execCmd = require('./utilities/execCmd')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')
const captureCmdFromArgs = require('./utilities/captureCmdFromArgs')

const serverName = captureServerNameFromArgs()

const cmd = captureCmdFromArgs()

execCmd({
  cmd,
  serverName,
}).catch(err => {
  console.log('err', err)
})
