/* eslint-disable no-console */
const path = require('path')
const createSnippets = require('./lib')

const rootPath = path.join(__dirname, '../', '../', '../')
const configPath = path.join(rootPath, 'config.scripts.js')
const sampleConfigPath = path.join(rootPath, 'sample.config.scripts.js')

let config
try {
  config = require(configPath) // eslint-disable-line global-require, import/no-dynamic-require
} catch (err) {
  console.log(
    'You have to create a config from sample config file: ',
    sampleConfigPath
  )
  throw err
}

createSnippets(config)
