const getServerRootFullPath = require('./getServerRootFullPath')
const createFullCmdString = require('./createFullCmdString')
const exec = require('ssh-exec')
const getServerHost = require('./getServerHost')
const getServerUser = require('./getServerUser')

module.exports = function remoteExecCmd({
  cmd: cmdInput = 'ls',
  envMap,
  execFromRoot = true,
  rootPath: rootPathInput,
  server,
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
        console.log(stdout)
        if (stderr) {
          return reject(stderr)
        }

        if (err) {
          return reject(err)
        }
        return resolve(stdout)
      }
    )
  })
}
