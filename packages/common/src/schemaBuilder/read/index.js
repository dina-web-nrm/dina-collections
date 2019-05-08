/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path')
const readEndpoints = require('./readEndpoints')
const readErrors = require('./readErrors')
const readInfo = require('./readInfo')
const readServers = require('./readServers')
const readModels = require('./readModels')
const readApis = require('./readApis')
const readSecurity = require('./readSecurity')
const mergeModelsAndModelConfigurations = require('./utilities/mergeModelsAndModelConfigurations')
const createSchemaInterface = require('../../schemaInterface/createSchemaInterface')
const createModels = require('../build/models')

module.exports = function read({ modelBasePath, apiBasePath, modelVersion }) {
  const servicesPath = path.join(apiBasePath, 'serviceConfigurations')
  const buildServicesPath = path.join(
    apiBasePath,
    'lib',
    'serviceConfigurationManager',
    'createServiceSpecifications'
  )
  const getModelConfigurationsMapPath = path.join(
    apiBasePath,
    'lib',
    'serviceConfigurationManager',
    'getters',
    'getModelConfigurationsMap'
  )

  const getModelConfigurationsMap = require(getModelConfigurationsMapPath)

  const serviceConfigurations = require(servicesPath)
  const modelConfigurationsMap = getModelConfigurationsMap({
    serviceConfigurations,
  })

  const infoPath = apiBasePath

  const errors = readErrors()
  const info = readInfo(infoPath)

  let models = readModels({ modelBasePath })

  models = mergeModelsAndModelConfigurations({
    modelConfigurationsMap,
    models,
  })

  const resourceModels = createModels({
    includeEndpointModels: false,
    models,
    normalize: true,
    version: modelVersion,
  })

  const schemaInterface = createSchemaInterface({
    getNormalizedModels: () => resourceModels,
  })
  const resourceRelationshipParamsMap = schemaInterface.getResourceRelationshipParamsMap()

  const buildServices = require(buildServicesPath)
  const services = buildServices({
    resourceRelationshipParamsMap,
    serviceConfigurations,
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
