const path = require('path')
const promptContinue = require('./utilities/promptContinue')
const localExecCmd = require('./utilities/localExecCmd')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')
const downloadFile = require('./utilities/downloadFile')

const serverName = captureServerNameFromArgs()

const relativeSqlZipFolderPath = 'data'

const sqlFileName = 'dump.sql'

const relativeSqlFilePath = path.join(relativeSqlZipFolderPath, sqlFileName)

return promptContinue({
  message: `This will download [REPO]/data/dump.sql from server: ${
    serverName
  } to [REPO]/data/ `,
})
  .then(() => {
    return localExecCmd({
      cmd: `rm ${relativeSqlFilePath}`,
      throwOnError: false,
    }).then(() => {
      return downloadFile({
        filePath: relativeSqlFilePath,
        server: serverName,
      }).then(transferreMessage => {
        console.log(transferreMessage)
        console.log('Data downloaded success')
      })
    })
  })
  .catch(err => {
    console.log('err', err)
  })
