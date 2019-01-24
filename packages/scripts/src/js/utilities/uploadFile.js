const fs = require('fs')

const ScpClient = require('scp2').Client
const path = require('path')
const getLocalRootFullPath = require('./getLocalRootFullPath')
const getServerRootFullPath = require('./getServerRootFullPath')
const getServerHost = require('./getServerHost')
const getServerUser = require('./getServerUser')
const getServerKeyFile = require('./getServerKeyFile')

module.exports = function uploadFile({ filePath, serverName } = {}) {
  const rootPath = getLocalRootFullPath()
  const localFilePath = path.join(rootPath, filePath)
  const remoteRepoRootPath = getServerRootFullPath(serverName)
  const remoteFilePath = path.join(remoteRepoRootPath, filePath)

  const keyPath = getServerKeyFile(serverName)

  const host = getServerHost(serverName)
  const user = getServerUser(serverName)

  const options = {
    agent: process.env.SSH_AUTH_SOCK,
    host,
    username: user,
  }

  if (keyPath) {
    options.privateKey = fs.readFileSync(keyPath)
  }

  return new Promise((resolve, reject) => {
    const client = new ScpClient(options)
    client.upload(localFilePath, remoteFilePath, err => {
      if (err) {
        return reject(err)
      }
      return resolve(
        `File uploaded successfully from ${localFilePath} to ${remoteFilePath} `
      )
    })
  })
}
