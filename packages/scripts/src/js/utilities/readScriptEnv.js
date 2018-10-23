const path = require('path')
const dotenv = require('dotenv')

const getLocalRootFullPath = require('./getLocalRootFullPath')

const rootPath = getLocalRootFullPath()
const scriptEnvRelativePath = './env/.scripts'
const scriptEnvFullPath = path.join(rootPath, scriptEnvRelativePath)

module.exports = function readScriptEnv() {
  return dotenv.load({ path: scriptEnvFullPath }).parsed
}
