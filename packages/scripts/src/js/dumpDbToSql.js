const promptContinue = require('./utilities/promptContinue')
const execScript = require('./utilities/execScript')
const execCmd = require('./utilities/execCmd')

const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')

const serverName = captureServerNameFromArgs()

return promptContinue({
  message: `This will create an sql dump of the database server: ${
    serverName
  } and store in [root]/data/dump.sql`,
})
  .then(() => {
    return execCmd({
      cmd: `rm ./data/dump.sql`,
      serverName,
      throwOnError: false,
    }).then(() => {
      return execScript({
        scriptName: 'docker-dump-db-to-sql.sh',
        serverName,
      }).then(() => {
        console.log('Dump created with success')
        if (serverName !== 'local') {
          console.log(
            `Run: "yarn remote:download:data:sql -s ${
              serverName
            }" to download dump`
          )
        }
      })
    })
  })
  .catch(err => {
    console.log('err', err)
  })
