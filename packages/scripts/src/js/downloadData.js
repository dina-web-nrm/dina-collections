const path = require('path')
const localExecScript = require('./utilities/localExecScript')
const localExecCmd = require('./utilities/localExecCmd')
const captureServerNameFromArg = require('./utilities/captureServerNameFromArg')
const downloadFile = require('./utilities/downloadFile')

const serverName = captureServerNameFromArg()

const relativeDataZipFolderPath = 'data'
const relativeDataZipFileName = 'data.zip'
const relativeDataZipFilePath = path.join(
  relativeDataZipFolderPath,
  relativeDataZipFileName
)

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
    })
      .then(transferreMessage => {
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
      .catch(err => {
        console.log('err', err)
      })
  })
})
