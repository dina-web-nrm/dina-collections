const captureFlagFromArgs = require('./captureFlagFromArgs')

module.exports = function captureCmdFromArgs({ throwOnMissing = true } = {}) {
  const cmd = captureFlagFromArgs({
    flag: '-c',
  })

  if (!throwOnMissing && !cmd) {
    return cmd
  }

  if (!cmd) {
    throw new Error(`Cmd name not provided. Provide with -c 'cmd' `)
  }
  return cmd
}
