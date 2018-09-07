const extractResourcesFromService = require('./extractResourcesFromService')
const extractOperationsFromResources = require('./extractOperationsFromResources')
const extractCustomControllersFromServices = require('./extractCustomControllersFromServices')
const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')
const createConnector = require('./createConnector')

const createLog = require('../../utilities/log')

const log = createLog('lib/connectors')

const systemValidate = (obj, schema) => {
  return createSystemBackendValidator({
    schema,
    throwError: false,
    type: 'config',
  })(obj)
}

module.exports = function createConnectors({
  config,
  fileInteractor,
  integrations,
  models,
  serviceInteractor,
  services,
}) {
  log.info('Create connectors')

  const apiConfig = { ...config.api, log: config.log, systemValidate }

  const connectors = {}
  Object.keys(services).forEach(serviceName => {
    const service = services[serviceName]
    const resources = extractResourcesFromService(service)
    const operations = extractOperationsFromResources(resources)
    const customControllerFactories = extractCustomControllersFromServices(
      services
    )
    Object.keys(operations).forEach(operationId => {
      const operation = operations[operationId]
      const connector = createConnector({
        apiConfig,
        customControllerFactories,
        fileInteractor,
        integrations,
        models,
        operation,
        operationId,
        serviceInteractor,
        serviceName,
      })
      connectors[operationId] = connector
    })
  })

  return Promise.resolve({
    connectors,
  })
}
