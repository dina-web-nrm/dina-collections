/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path')
const readEndpoints = require('./readEndpoints')
const readErrors = require('./readErrors')
const readInfo = require('./readInfo')
const readServers = require('./readServers')
const readModels = require('./readModels')
const readApis = require('./readApis')
const readSecurity = require('./readSecurity')

module.exports = function read({ modelBasePath, apiBasePath }) {
  const servicesPath = path.join(apiBasePath, 'services')
  const buildServicesPath = path.join(apiBasePath, 'lib', 'services')

  const serviceDefinitions = require(servicesPath)
  const buildServices = require(buildServicesPath)

  const services = buildServices({ serviceDefinitions })
  const infoPath = apiBasePath

  const endpoints = readEndpoints(services)
  const errors = readErrors()
  const info = readInfo(infoPath)
  const models = readModels(modelBasePath)
  const apis = readApis(services)
  const servers = readServers(path.join(apiBasePath, 'info', 'servers'))

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
    servers,
  }
}
