const scp = require('scp')
const path = require('path')
const getLocalRootFullPath = require('./getLocalRootFullPath')
const getServerRootFullPath = require('./getServerRootFullPath')
const getServerHost = require('./getServerHost')
const getServerUser = require('./getServerUser')

module.exports = function sendFile({ filePath, serverName } = {}) {
  const rootPath = getLocalRootFullPath()
  const localFilePath = path.join(rootPath, filePath)
  const remoteRepoRootPath = getServerRootFullPath(serverName)
  const remoteFilePath = path.join(remoteRepoRootPath, filePath)

  const host = getServerHost(serverName)
  const user = getServerUser(serverName)

  const options = {
    file: localFilePath,
    host,
    path: remoteFilePath,
    user,
  }

  return new Promise((resolve, reject) => {
    scp.send(options, (err, stdout, stderr) => {
      if (stderr) {
        return reject(stderr)
      }
      if (err) {
        return reject(err)
      }
      return resolve(
        `File uploaded successfully from ${localFilePath} to ${remoteFilePath} `
      )
    })
  })
}
