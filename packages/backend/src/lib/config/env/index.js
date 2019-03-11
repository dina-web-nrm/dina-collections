const dotenv = require('dotenv')
const ensureNodeEnv = require('common/src/env/ensureNodeEnv')
const createEnvReader = require('common/src/env/createEnvReader')
const getEnvFilePath = require('common/src/env/getEnvFilePath')
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
