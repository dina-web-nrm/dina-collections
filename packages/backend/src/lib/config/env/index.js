const dotenv = require('dotenv')
const resolveEnvVariables = require('./resolveEnvVariables')

dotenv.config()

const {
  requiredEnvVariables,
  devVariables,
  optionalEnvVariables,
  testVariables,
} = require('./envVariables')

const requiredEnv = resolveEnvVariables({
  envVariables: requiredEnvVariables,
  required: true,
})

const optionalEnv = resolveEnvVariables({
  envVariables: devVariables,
  nodeEnv: ['development', 'test'],
  required: false,
})

const devEnv = resolveEnvVariables({
  envVariables: optionalEnvVariables,
  required: false,
})

const testEnv = resolveEnvVariables({
  envVariables: testVariables,
  nodeEnv: 'test',
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

module.exports = {
  readBoolKey,
  readKey,
}
