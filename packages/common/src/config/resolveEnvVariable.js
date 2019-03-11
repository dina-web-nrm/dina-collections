module.exports = function resolveEnvVariable({
  envKey,
  nodeEnv,
  processEnv,
  required,
} = {}) {
  const value = processEnv[envKey]
  if (required && value === undefined) {
    throw new Error(`Env variable: ${envKey} is missing`)
  }

  if (value === undefined) {
    return value
  }

  if (nodeEnv !== undefined) {
    const nodeEnvArray = Array.isArray(nodeEnv) ? nodeEnv : [nodeEnv]
    if (!nodeEnvArray.includes(processEnv.NODE_ENV)) {
      return undefined
    }
  }

  if (value === 'false') {
    return false
  }
  if (value === 'true') {
    return true
  }

  return value
}
