const createService = require('./serviceFactory')

module.exports = function createServices({ config, serviceDefinitions }) {
  return Object.keys(config.services).reduce((services, serviceName) => {
    if (!config.services[serviceName]) {
      return services
    }

    if (!serviceDefinitions[serviceName]) {
      throw new Error(`Service with name: ${serviceName} not registered`)
    }

    const service = createService(serviceDefinitions[serviceName])

    return {
      ...services,
      [serviceName]: service,
    }
  }, {})
}
