/* eslint-disable sort-keys */
require('console.table')
const localExecCmd = require('./utilities/localExecCmd')
const getServerHost = require('./utilities/getServerHost')
const remoteExecCmd = require('./utilities/remoteExecCmd')
const getAvailableServerNames = require('./utilities/getAvailableServerNames')

const serverNames = getAvailableServerNames()

const execCmd = ({ serverName, cmd }) => {
  return Promise.resolve().then(() => {
    if (serverName === 'local') {
      return localExecCmd({
        cmd,
        printResult: false,
        server: serverName,
      })
    }
    return remoteExecCmd({
      cmd,
      printResult: false,
      server: serverName,
    })
  })
}

const determineRunningVersions = serverName => {
  return execCmd({
    serverName,
    cmd:
      'docker ps --filter "status=running"  --format "{{.Names}} {{.Image}}"',
  }).then(statusMessage => {
    return execCmd({
      cmd: 'hostname',
      serverName,
    }).then(hostName => {
      const statusObject = {
        localServerName: serverName,
        hostName: hostName.split('\n')[0],
        host: getServerHost(serverName),
        'dina-api': 'not running',
        'dina-collections-ui': 'not running',
        'dina-semantic-ui-docs': 'not running',
        'dina-worker': 'not running',
        elasticsearch: 'not running',
        keycloak: 'not running',
        'keycloak-mysql': 'not running',
        postgres: 'not running',
        proxy: 'not running',
      }
      statusMessage.split('\n').forEach(row => {
        if (row) {
          const segments = row.split(' ')
          const serviceName = segments[0]
          const image = segments[1]
          const imageSegments = image.split(':')
          const version = imageSegments[imageSegments.length - 1]

          statusObject[serviceName] = version
        }
      })

      return statusObject
    })
  })
}

const promises = serverNames.map(serverName => {
  return determineRunningVersions(serverName)
})

Promise.all(promises)
  .then(output => {
    console.log('\n\n')
    console.table(output)
  })
  .catch(err => {
    console.log('err', err)
  })
