const fs = require('fs')
const path = require('path')
const promptContinue = require('./utilities/promptContinue')
const localExecCmd = require('./utilities/localExecCmd')
const localExecScript = require('./utilities/localExecScript')
const getLocalRootFullPath = require('./utilities/getLocalRootFullPath')

const importInfoPath = path.join(
  getLocalRootFullPath(),
  './data/.importInfo.json'
)

const env = 'development'

return promptContinue({
  message: `This will drop the database configured for env: ${
    env
  } and import [REPO]/data/dump.sql`,
})
  .then(() => {
    return localExecCmd({
      cmd: `cd ./packages/migrations && yarn db:${env}:drop`,
      throwOnError: false,
    }).then(() => {
      return localExecCmd({
        cmd: `cd ./packages/migrations && yarn db:${env}:create`,
        throwOnError: false,
      }).then(() => {
        return localExecScript({
          scriptName: 'docker-import-data-from-sql.sh',
          throwOnError: false,
        }).then(transferreMessage => {
          fs.writeFileSync(
            importInfoPath,
            JSON.stringify({
              date: 'not-available',
              version: 'from-sql',
            })
          )

          console.log(transferreMessage)
          console.log('Data import success')
        })
      })
    })
  })
  .catch(err => {
    console.log('err', err)
  })
