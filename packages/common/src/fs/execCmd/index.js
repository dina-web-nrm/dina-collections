const { exec } = require('child_process')
const createFullCmd = require('./createFullCmd')

module.exports = function execCmd({
  cmd: cmdInput,
  execFromRoot = true,
  logFn = false,
  throwOnError = false,
} = {}) {
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'test'
  ) {
    throw new Error('Only allowed to run in development and test')
  }
  const cmd = createFullCmd({
    cmd: cmdInput,
    execFromRoot,
  })

  return new Promise((resolve, reject) => {
    if (logFn) {
      logFn(`running cmd: ${cmd}`)
    }

    exec(cmd, (err, stdout, stderr) => {
      if (logFn) {
        logFn(stdout)
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
    })
  })
}
