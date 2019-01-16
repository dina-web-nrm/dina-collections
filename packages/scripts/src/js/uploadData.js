const path = require('path')
const remoteExecScript = require('./utilities/remoteExecScript')
const remoteExecCmd = require('./utilities/remoteExecCmd')
const captureServerNameFromArg = require('./utilities/captureServerNameFromArg')
const sendFile = require('./utilities/sendFile')

const serverName = captureServerNameFromArg()

const relativeDataZipFolderPath = 'data'
const relativeDataZipFileName = 'data.zip'
const relativeDataZipFilePath = path.join(
  relativeDataZipFolderPath,
  relativeDataZipFileName
)

return remoteExecScript({
  scriptName: 'rm-data.sh',
  server: serverName,
  throwOnError: false,
}).then(() => {
  return remoteExecCmd({
    cmd: `rm ${relativeDataZipFilePath}`,
    server: serverName,
    throwOnError: false,
  }).then(() => {
    return sendFile({
      filePath: relativeDataZipFilePath,
      server: serverName,
    })
      .then(transferreMessage => {
        console.log(transferreMessage)
        return remoteExecCmd({
          cmd: `cd ${relativeDataZipFolderPath} && unzip -n ${
            relativeDataZipFileName
          }`,
          server: serverName,
        }).then(() => {
          console.log('Data uploaded and unpacked success')
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  })
})
