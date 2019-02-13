const path = require('path')
const promptContinue = require('./utilities/promptContinue')
const localExecCmd = require('./utilities/localExecCmd')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')
const downloadFile = require('./utilities/downloadFile')

const serverName = captureServerNameFromArgs()

const relativeDataZipFolderPath = 'data'
const relativeDataZipFileName = 'data.zip'
const relativeDataZipFilePath = path.join(
  relativeDataZipFolderPath,
  relativeDataZipFileName
)

return promptContinue({
  message: `This will download [REPO]/data/data.zip from server: ${
    serverName
  } to [REPO]/data/ `,
})
  .then(() => {
    return localExecCmd({
      cmd: `rm ${relativeDataZipFilePath}`,
      serverName,
      throwOnError: false,
    }).then(() => {
      return downloadFile({
        filePath: relativeDataZipFilePath,
        serverName,
      }).then(transferreMessage => {
        console.log(transferreMessage)
        console.log('Data downloaded')
        process.exit(0)
      })
    })
  })
  .catch(err => {
    console.log('err', err)
  })
