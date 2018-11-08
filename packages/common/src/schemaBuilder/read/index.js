/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path')
const readEndpoints = require('./readEndpoints')
const readErrors = require('./readErrors')
const readInfo = require('./readInfo')
const readServers = require('./readServers')
const readModels = require('./readModels')
const readApis = require('./readApis')
const readSecurity = require('./readSecurity')
const createSchemaInterface = require('../../schemaInterface/createSchemaInterface')

module.exports = function read({ modelBasePath, apiBasePath }) {
  const servicesPath = path.join(apiBasePath, 'services')
  const buildServicesPath = path.join(apiBasePath, 'lib', 'services')

  const infoPath = apiBasePath

  const errors = readErrors()
  const info = readInfo(infoPath)
  const models = readModels(modelBasePath)

  const schemaInterface = createSchemaInterface({ getModels: () => models })
  const resourceRelationshipParamsMap = schemaInterface.getResourceRelationshipParamsMap()

  const serviceDefinitions = require(servicesPath)
  const buildServices = require(buildServicesPath)
  const services = buildServices({
    resourceRelationshipParamsMap,
    serviceDefinitions,
  })

  const endpoints = readEndpoints(services)
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
