const execScript = require('./utilities/execScript')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')

const serverName = captureServerNameFromArgs()

if (serverName === 'production') {
  throw new Error(
    'Not allowed to run from remote for server production. Run from server instead.'
  )
}

execScript({
  serverName,
})
