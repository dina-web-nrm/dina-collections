const resolveEnvVariables = require('./resolveEnvVariables')

module.exports = function createEnvReader({
  envDefinitions = {},
  processEnv,
} = {}) {
  const {
    devVariables = [],
    optionalEnvVariables = [],
    requiredEnvVariables = [],
    testVariables = [],
  } = envDefinitions

  const requiredEnv = resolveEnvVariables({
    envVariables: requiredEnvVariables,
    processEnv,
    required: true,
  })

  const optionalEnv = resolveEnvVariables({
    envVariables: optionalEnvVariables,
    processEnv,
    required: false,
  })

  const devEnv = resolveEnvVariables({
    envVariables: devVariables,
    nodeEnv: ['development', 'test'],
    processEnv,
    required: false,
  })

  const testEnv = resolveEnvVariables({
    envVariables: testVariables,
    nodeEnv: 'test',
    processEnv,
    required: false,
  })

  const existingEnvVariables = [
    ...requiredEnvVariables,
    ...optionalEnvVariables,
    ...devVariables,
    ...testVariables,
  ]

  const resolvedEnvVariables = {
    ...devEnv,
    ...optionalEnv,
    ...requiredEnv,
    ...testEnv,
  }

  function readKey(key, defaultValue = undefined) {
    if (!existingEnvVariables.includes(key)) {
      throw new Error(`Trying to access non existing env varable: ${key}`)
    }
    if (resolvedEnvVariables[key] === undefined) {
      return defaultValue
    }
    return resolvedEnvVariables[key]
  }

  function readBoolKey(key, defaultValue = false) {
    const boolValue = readKey(key)
    if (boolValue !== undefined) {
      return boolValue
    }
    return defaultValue
  }

  return {
    readBoolKey,
    readKey,
  }
}
