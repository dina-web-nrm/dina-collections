const createFullCmdString = require('./createFullCmdString')
const { exec } = require('child_process')

module.exports = function localExecCmd({
  cmd: cmdInput,
  envMap,
  printResult,
  rootPath,
  throwOnError = true,
}) {
  const cmd = createFullCmdString({
    cmdInput,
    envMap,
    rootPath,
  })

  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
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
        return resolve(stderr)
      }
      return resolve(stdout)
    })
  })
}
