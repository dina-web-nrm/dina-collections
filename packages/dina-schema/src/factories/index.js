/* eslint-disable sort-keys */
const path = require('path')

const readEndpoints = require('./read/readEndpoints')
const readErrors = require('./read/readErrors')
const readInfo = require('./read/readInfo')
const readModels = require('./read/readModels')
const readParameters = require('./read/readParameters')
const readApis = require('./read/readApis')
const readSecurity = require('./read/readSecurity')

const createOpenApi = require('./openApi')
const createModels = require('./models')
const createSwagger = require('./swagger')

const basePath = path.join(__dirname, '../specification')
const endpointsPath = path.join(basePath, 'endpoints')
const modelsPath = path.join(basePath, 'models')
const parametersPath = path.join(basePath, 'parameters')
const apisPath = path.join(basePath, 'apis')

const endpoints = readEndpoints(endpointsPath)
const errors = readErrors()
const info = readInfo(basePath)
const models = readModels(modelsPath)
const parameters = readParameters(parametersPath)
const apis = readApis(apisPath)
const security = readSecurity()

const openApi = createOpenApi({
  endpoints,
  errors,
  info,
  models,
  parameters,
  apis,
  security,
})

const swagger = createSwagger({
  endpoints,
  errors,
  info,
  models,
  parameters,
  apis,
  security,
})

const cleanModels = createModels({
  endpoints,
  errors,
  info,
  models,
  parameters,
  apis,
  security,
})

module.exports = {
  models: cleanModels,
  openApi,
  swagger,
}
