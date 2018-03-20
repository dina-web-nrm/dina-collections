const extractResourcesFromServices = require('./extractResourcesFromServices')
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

module.exports = function createConnectors({ config, models, services }) {
  log.info('Create connectors')

  const apiConfig = { ...config.api, log: config.log, systemValidate }
  const resources = extractResourcesFromServices(services)
  const operations = extractOperationsFromResources(resources)
  const customControllerFactories = extractCustomControllersFromServices(
    services
  )

  const connectors = Object.keys(operations).reduce((obj, operationId) => {
    const operation = operations[operationId]
    const connector = createConnector({
      apiConfig,
      customControllerFactories,
      models,
      operation,
      operationId,
    })
    return {
      ...obj,
      [operationId]: connector,
    }
  }, {})

  return Promise.resolve({
    connectors,
  })
}
