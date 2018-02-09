const path = require('path')
const readEndpoints = require('./readEndpoints')
const readErrors = require('./readErrors')
const readInfo = require('./readInfo')
const readModels = require('./readModels')
// const readParameters = require('./readParameters')
const readApis = require('./readApis')
const readSecurity = require('./readSecurity')

module.exports = function read({ modelBasePath, apiBasePath }) {
  const infoPath = apiBasePath

  const endpoints = readEndpoints(path.join(apiBasePath, 'apis'))
  const errors = readErrors()
  const info = readInfo(infoPath)
  const models = readModels(modelBasePath)
  const apis = readApis(path.join(apiBasePath, 'apis'))
  const parameters = {}
  const security = readSecurity()
  return {
    apis,
    endpoints,
    errors,
    info,
    models,
    parameters,
    security,
  }
}
