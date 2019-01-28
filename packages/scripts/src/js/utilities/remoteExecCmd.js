const getServerRootFullPath = require('./getServerRootFullPath')
const createFullCmdString = require('./createFullCmdString')
const exec = require('ssh-exec')
const getServerHost = require('./getServerHost')
const getServerKeyFile = require('./getServerKeyFile')
const getServerUser = require('./getServerUser')

module.exports = function remoteExecCmd({
  cmd: cmdInput = 'ls',
  envMap,
  execFromRoot = true,
  printResult = true,
  rootPath: rootPathInput,
  serverName,
  throwOnError = true,
}) {
  const rootPath = rootPathInput || getServerRootFullPath(serverName)

  const host = getServerHost(serverName)
  const key = getServerKeyFile(serverName)
  const user = getServerUser(serverName)

  const cmd = createFullCmdString({
    cmdInput,
    envMap,
    execFromRoot,
    host,
    rootPath,
    user,
  })

  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        agent: process.env.SSH_AUTH_SOCK,
        host,
        key,
        user,
      },
      (err, stdout, stderr) => {
        if (printResult) {
          console.log(stdout)
        }

        if (stderr) {
          if (err && throwOnError) {
            return reject(stderr)
          }
          return resolve(`${stdout} \n${stderr}`)
        }

        if (err) {
          if (throwOnError) {
            return reject(err)
          }
          return resolve(err)
        }
        return resolve(stdout)
      }
    )
  })
}
