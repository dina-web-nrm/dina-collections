const promptContinue = require('./utilities/promptContinue')
const localExecCmd = require('./utilities/localExecCmd')
const localExecScript = require('./utilities/localExecScript')

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
        }).then(transferreMessage => {
          console.log(transferreMessage)
          console.log('Data import success')
        })
      })
    })
  })
  .catch(err => {
    console.log('err', err)
  })
