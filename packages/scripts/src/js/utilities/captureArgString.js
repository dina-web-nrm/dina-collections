const removeFlagsFromArgArray = require('./removeFlagsFromArgArray')

module.exports = function captureArgString({ removeFlags = ['-s'] } = {}) {
  const args = removeFlagsFromArgArray({
    args: process.argv.slice(2),
    flags: removeFlags,
  })

  return args.join(' ')
}
