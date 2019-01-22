const fs = require('fs')
const path = require('path')
const execScript = require('./utilities/execScript')
const promptPromise = require('./utilities/promptPromise')
const promptContinue = require('./utilities/promptContinue')
const captureServerNameFromArgs = require('./utilities/captureServerNameFromArgs')
const getLocalRootFullPath = require('./utilities/getLocalRootFullPath')

const serverName = captureServerNameFromArgs()

const infoPath = path.join(getLocalRootFullPath(), './data/.info.json')

let newVersion = false
return Promise.resolve()
  .then(() => {
    if (serverName !== 'local') {
      console.log('Not creating new version since server not local')
      return null
    }
    return promptPromise({
      description: 'Create new version?. y/n',
      message: 'provide y/n',
      name: 'answer',
      required: true,
    }).then(({ answer }) => {
      newVersion = answer === 'y'
      if (!newVersion) {
        return null
      }
      return promptPromise({
        description: 'Enter versionName: ',
        message: 'provide y/n',
        name: 'versionName',
        required: true,
      }).then(({ versionName }) => {
        newVersion = versionName
      })
    })
  })
  .then(() => {
    const versionString = !newVersion ? '' : `with version: ${newVersion}`
    return promptContinue({
      message: `This will create ./data/data.zip on server: ${
        serverName
      } in [REPO]/data/ ${versionString}`,
    })
      .then(() => {
        if (newVersion && serverName === 'local') {
          fs.writeFileSync(infoPath, JSON.stringify({ version: newVersion }))
        }
        return execScript({
          scriptName: 'build-data-zip.sh',
          serverName,
        }).then(() => {
          console.log('./data/data.zip created')
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  })
