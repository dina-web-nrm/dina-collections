const createLog = require('../../utilities/log')
const createService = require('./serviceFactory')

const log = createLog('lib/services')

module.exports = function createServices({ config, serviceDefinitions }) {
  log.info('Create services')
  return Object.keys(config.services).reduce((services, serviceName) => {
    if (!config.services[serviceName]) {
      return services
    }

    if (!serviceDefinitions[serviceName]) {
      throw new Error(`Service with name: ${serviceName} not registered`)
    }
    const service = createService({
      log: log.scope(),
      serviceDefinition: serviceDefinitions[serviceName],
    })

    return {
      ...services,
      [serviceName]: service,
    }
  }, {})
}
