const shouldRunWithCurrentEnv = require('./shouldRunWithCurrentEnv')

module.exports = function createEnvDescribe(input) {
  return function describeInEnv(name, ...rest) {
    if (!shouldRunWithCurrentEnv(input)) {
      return describe.skip(name, ...rest)
    }
    return describe(name, ...rest)
  }
}
