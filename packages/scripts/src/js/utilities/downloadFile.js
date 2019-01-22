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
    file: remoteFilePath,
    host,
    path: localFilePath,
    user,
  }

  return new Promise((resolve, reject) => {
    scp.get(options, (err, stdout, stderr) => {
      if (stderr) {
        return reject(stderr)
      }
      if (err) {
        return reject(err)
      }
      return resolve(
        `File downloaded successfully from ${remoteFilePath} to ${
          localFilePath
        } `
      )
    })
  })
}
