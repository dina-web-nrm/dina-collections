const path = require('path')
const promptContinue = require('./utilities/promptContinue')
const localExecScript = require('./utilities/localExecScript')
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
  } and unpack in [REPO]/data/ `,
})
  .then(() => {
    return localExecScript({
      scriptName: 'rm-data.sh',
      throwOnError: false,
    }).then(() => {
      return localExecCmd({
        cmd: `rm ${relativeDataZipFilePath}`,
        server: serverName,
        throwOnError: false,
      }).then(() => {
        return downloadFile({
          filePath: relativeDataZipFilePath,
          server: serverName,
        }).then(transferreMessage => {
          console.log(transferreMessage)
          return localExecCmd({
            cmd: `cd ${relativeDataZipFolderPath} && unzip -n ${
              relativeDataZipFileName
            }`,
          }).then(res => {
            console.log('res', res)
            console.log('Data downloaded and unpacked success')
          })
        })
      })
    })
  })
  .catch(err => {
    console.log('err', err)
  })
