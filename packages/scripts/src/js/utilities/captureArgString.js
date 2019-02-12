const extractArgsToForward = require('./extractArgsToForward')

module.exports = function captureArgString({ removeFlags = ['-s'] } = {}) {
  const args = extractArgsToForward({
    args: process.argv.slice(2),
    removeFlags,
  })

  return args.join(' ')
}
