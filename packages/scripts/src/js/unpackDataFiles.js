const promptContinue = require('./utilities/promptContinue')
const execScript = require('./utilities/execScript')
const execCmd = require('./utilities/execCmd')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')

const serverName = captureServerNameFromArgs()

const relativeDataZipFolderPath = 'data'
const relativeDataZipFileName = 'data.zip'

return promptContinue({
  message: `This will unpack [REPO]/data/data.zip on server: ${serverName} in [REPO]/data/. Note that current data json files will be discarded`,
}).then(() => {
  return execScript({
    scriptName: 'rm-data.sh',
    serverName,
    throwOnError: false,
  }).then(() => {
    console.log('Removed current json files. Now unpacking')
    return execCmd({
      cmd: `cd ${relativeDataZipFolderPath} && unzip -n ${relativeDataZipFileName}`,
      serverName,
    }).then(() => {
      console.log('Data unpacked success')
      process.exit(0)
    })
  })
})
