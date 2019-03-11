const dotenv = require('dotenv')
const ensureNodeEnv = require('common/src/config/ensureNodeEnv')
const createEnvReader = require('common/src/config/createEnvReader')
const getEnvFilePath = require('./getEnvFilePath')
const envDefinitions = require('./envDefinitions')

const envFilePath = getEnvFilePath({
  envFileName: '.backend',
})

if (envFilePath) {
  dotenv.config({
    path: envFilePath,
  })
} else {
  dotenv.config()
}

const { readBoolKey, readKey } = createEnvReader({
  envDefinitions,
  processEnv: process.env,
})

module.exports = {
  ensureNodeEnv,
  readBoolKey,
  readKey,
}
