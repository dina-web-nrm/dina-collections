const createFullCmdString = require('./createFullCmdString')
const { exec } = require('child_process')

module.exports = function localExecCmd({
  cmd: cmdInput,
  envMap,
  printResult,
  rootPath,
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
        return reject(stderr)
      }

      if (err) {
        return reject(err)
      }
      return resolve(stdout)
    })
  })
}
