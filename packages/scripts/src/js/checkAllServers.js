/* eslint-disable sort-keys */
require('console.table')
const localExecCmd = require('./utilities/localExecCmd')
const localExecScript = require('./utilities/localExecScript')
const remoteExecScript = require('./utilities/remoteExecScript')
const getServerHost = require('./utilities/getServerHost')
const remoteExecCmd = require('./utilities/remoteExecCmd')
const getAvailableServerNames = require('./utilities/getAvailableServerNames')

const serverNames = getAvailableServerNames()

const execScript = ({ serverName, scriptName }) => {
  return Promise.resolve().then(() => {
    if (serverName === 'local') {
      return localExecScript({
        scriptName,
        printResult: false,
        server: serverName,
      })
    }
    return remoteExecScript({
      scriptName,
      printResult: false,
      server: serverName,
    })
  })
}

const execCmd = ({ serverName, cmd }) => {
  return Promise.resolve().then(() => {
    if (serverName === 'local') {
      return localExecCmd({
        cmd,
        printResult: false,
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
  let serverStatusObject = {
    scriptEnvServerName: serverName,
    scriptEnvHost: getServerHost(serverName),
    externalIp: 'unknown',
    gitBranch: 'unknown',
    lastGitTag: 'unknown',
    hostName: 'unknown',
    connected: 'false',
  }
  let serviceStatusObject = {
    scriptEnvServerName: serverName,
    'dina-api': 'unknown',
    'dina-collections-ui': 'unknown',
    'dina-semantic-ui-docs': 'unknown',
    'dina-worker': 'unknown',
    elasticsearch: 'unknown',
    keycloak: 'unknown',
    'keycloak-mysql': 'unknown',
    postgres: 'unknown',
    proxy: 'unknown',
  }
  return execCmd({
    serverName,
    cmd:
      'docker ps --filter "status=running"  --format "{{.Names}} {{.Image}}"',
  })
    .then(statusMessage => {
      return execScript({
        scriptName: 'get-server-info-json.sh',
        serverName,
      }).then(infoString => {
        const info = JSON.parse(infoString.replace(/(\r\n\t|\n|\r\t)/gm, ''))
        serverStatusObject = {
          ...serverStatusObject,
          externalIp: info.externalIp,
          gitBranch: info.branch,
          lastGitTag: info.lastTag,
          hostName: info.hostName,
          connected: 'true',
        }
        serviceStatusObject = {
          ...serviceStatusObject,
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

            serviceStatusObject[serviceName] = version
          }
        })

        return { serverStatusObject, serviceStatusObject }
      })
    })
    .catch(err => {
      console.log('err', err)
      return { serverStatusObject, serviceStatusObject }
    })
}

const promises = serverNames.map(serverName => {
  return determineRunningVersions(serverName)
})

Promise.all(promises)
  .then(output => {
    console.log('\n\n')
    console.table(
      'Server status',
      output.map(({ serverStatusObject }) => serverStatusObject)
    )
    console.log('\n\n')
    console.table(
      'Service status',
      output.map(({ serviceStatusObject }) => serviceStatusObject)
    )
  })
  .catch(err => {
    console.log('err', err)
  })
