const resolveEnvVariable = require('./resolveEnvVariable')

module.exports = function resolveVariables({
  envVariables = [],
  nodeEnv = undefined,
  processEnv,
  required = true,
} = {}) {
  return envVariables.reduce((obj, envKey) => {
    const value = resolveEnvVariable({
      envKey,
      nodeEnv,
      processEnv,
      required,
    })

    if (value === undefined) {
      return obj
    }

    return {
      ...obj,
      [envKey]: value,
    }
  }, {})
}
