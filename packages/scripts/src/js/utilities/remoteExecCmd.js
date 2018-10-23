const exec = require('ssh-exec')
const getServerHost = require('./getServerHost')
const getServerUser = require('./getServerUser')

module.exports = function remoteExecCmd({ cmd = 'ls', server }) {
  const host = getServerHost(server)
  const user = getServerUser(server)

  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        host,
        user,
      },
      (err, stdout, stderr) => {
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
