const removeFlagsFromArgArray = require('./removeFlagsFromArgArray')

module.exports = function captureArgString({ removeFlags = ['-s'] } = {}) {
  const args = removeFlagsFromArgArray({
    args: process.argv.slice(3),
    flags: removeFlags,
  })

  return args.join(' ')
}
