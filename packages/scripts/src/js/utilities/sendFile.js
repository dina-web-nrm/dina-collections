const scp = require('scp')
const path = require('path')
const getLocalRootFullPath = require('./getLocalRootFullPath')
const getServerRootFullPath = require('./getServerRootFullPath')
const getServerHost = require('./getServerHost')
const getServerUser = require('./getServerUser')

module.exports = function sendFile({ filePath, server } = {}) {
  const rootPath = getLocalRootFullPath()
  const localFilePath = path.join(rootPath, filePath)
  const remoteRepoRootPath = getServerRootFullPath(server)
  const remoteFilePath = path.join(remoteRepoRootPath, filePath)

  const host = getServerHost(server)
  const user = getServerUser(server)

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
