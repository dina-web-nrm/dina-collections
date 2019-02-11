const promptContinue = require('./utilities/promptContinue')
const execScript = require('./utilities/execScript')
const execCmd = require('./utilities/execCmd')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')

const serverName = captureServerNameFromArgs()

const relativeDataZipFolderPath = 'data'
const relativeDataZipFileName = 'data.zip'

return promptContinue({
  message: `This will unpack [REPO]/data/data.zip on server: ${
    serverName
  } and start an import. Note that current data json files will be discarded`,
}).then(() => {
  return execScript({
    scriptName: 'rm-data.sh',
    serverName,
    throwOnError: false,
  }).then(() => {
    return execCmd({
      cmd: `cd ${relativeDataZipFolderPath} && unzip -n ${
        relativeDataZipFileName
      }`,
      serverName,
    })
      .then(() => {
        if (serverName === 'local') {
          return execCmd({
            cmd: 'yarn import:data:json',
            serverName,
          })
        }
        return execScript({
          scriptName: 'docker-import-data-from-files.sh',
          serverName,
        })
      })
      .then(() => {
        process.exit(0)
      })
  })
})
