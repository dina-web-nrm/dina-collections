const extractResourcesFromServices = require('./extractResourcesFromServices')
const extractOperationsFromResources = require('./extractOperationsFromResources')
const extractCustomControllersFromServices = require('./extractCustomControllersFromServices')

const createConnector = require('./createConnector')

const createLog = require('../../utilities/log')

const log = createLog('lib/connectors')

module.exports = function createConnectors({ config, models, services }) {
  log.info('Create connectors')

  const apiConfig = { ...config.api, log: config.log }
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
