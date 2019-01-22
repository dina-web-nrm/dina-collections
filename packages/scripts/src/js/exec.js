const execScript = require('./utilities/execScript')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')

const serverName = captureServerNameFromArgs()

execScript({
  serverName,
})
