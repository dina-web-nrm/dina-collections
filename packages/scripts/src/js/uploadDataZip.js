const path = require('path')
const promptContinue = require('./utilities/promptContinue')
const remoteExecCmd = require('./utilities/remoteExecCmd')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')
const uploadFile = require('./utilities/uploadFile')

const serverName = captureServerNameFromArgs()

const relativeDataZipFolderPath = 'data'
const relativeDataZipFileName = 'data.zip'
const relativeDataZipFilePath = path.join(
  relativeDataZipFolderPath,
  relativeDataZipFileName
)

return promptContinue({
  message: `This will upload [REPO]/data/data.zip to server: ${serverName}`,
})
  .then(() => {
    return remoteExecCmd({
      cmd: `rm ${relativeDataZipFilePath}`,
      serverName,
      throwOnError: false,
    }).then(() => {
      console.log('Removed current zip (if existed). Now uploading')
      return uploadFile({
        filePath: relativeDataZipFilePath,
        serverName,
      }).then(transferMessage => {
        console.log(transferMessage)
        console.log('Data uploaded success')
        process.exit(0)
      })
    })
  })
  .catch(err => {
    console.log('err', err)
  })
