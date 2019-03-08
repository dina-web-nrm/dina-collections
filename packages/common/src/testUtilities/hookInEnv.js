const shouldRunWithCurrentEnv = require('./shouldRunWithCurrentEnv')

module.exports = function createEnvHook(input) {
  return function hookInEnv(hook, ...rest) {
    if (!shouldRunWithCurrentEnv(input)) {
      return null
    }
    return hook(...rest)
  }
}
