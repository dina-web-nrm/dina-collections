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
    envVariables: devVariables,
    nodeEnv: ['development', 'test'],
    processEnv,
    required: false,
  })

  const devEnv = resolveEnvVariables({
    envVariables: optionalEnvVariables,
    processEnv,
    required: false,
  })

  const testEnv = resolveEnvVariables({
    envVariables: testVariables,
    nodeEnv: 'test',
    processEnv,
    required: false,
  })

  const existingEnvVarialbes = [
    ...requiredEnvVariables,
    ...devVariables,
    ...optionalEnvVariables,
    ...testVariables,
  ]

  const resolvedEnvVariables = {
    ...devEnv,
    ...optionalEnv,
    ...requiredEnv,
    ...testEnv,
  }

  function readKey(key) {
    if (!existingEnvVarialbes.includes(key)) {
      throw new Error(`Trying to access non existing env varable: ${key}`)
    }
    return resolvedEnvVariables[key]
  }

  function readBoolKey(key) {
    return readKey(key) === true
  }

  return {
    readBoolKey,
    readKey,
  }
}
