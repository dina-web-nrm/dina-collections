const getServerRootFullPath = require('./getServerRootFullPath')
const createFullCmdString = require('./createFullCmdString')
const exec = require('ssh-exec')
const getServerHost = require('./getServerHost')
const getServerUser = require('./getServerUser')

module.exports = function remoteExecCmd({
  cmd: cmdInput = 'ls',
  envMap,
  execFromRoot = true,
  printResult = true,
  rootPath: rootPathInput,
  server,
  throwOnError = true,
}) {
  const rootPath = rootPathInput || getServerRootFullPath(server)

  const host = getServerHost(server)
  const user = getServerUser(server)

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
        host,
        user,
      },
      (err, stdout, stderr) => {
        if (printResult) {
          console.log(stdout)
        }

        if (stderr) {
          if (throwOnError) {
            return reject(stderr)
          }
          return resolve(stderr)
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
