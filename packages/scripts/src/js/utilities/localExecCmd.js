const { exec } = require('child_process')

module.exports = function localExecCmd({ cmd = 'ls' }) {
  console.log(`Executing locally -> ${cmd} `)
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
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
