const resolveParameter = ({ envKey, required, nodeEnv }) => {
  const value = process.env[envKey]
  if (required && value === undefined) {
    throw new Error(`Env variable: ${envKey} is missing`)
  }

  if (value === undefined) {
    return value
  }

  if (nodeEnv !== undefined) {
    const nodeEnvArray = Array.isArray(nodeEnv) ? nodeEnv : [nodeEnv]
    if (!nodeEnvArray.includes(process.env.NODE_ENV)) {
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

module.exports = function resolveVariables({
  envVariables,
  nodeEnv = undefined,
  required = true,
}) {
  return envVariables.reduce((obj, envKey) => {
    const value = resolveParameter({
      envKey,
      nodeEnv,
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
