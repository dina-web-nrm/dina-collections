const createLog = require('../../../../utilities/log')
const createService = require('./serviceFactory')

const defaultLog = createLog('lib/services')

module.exports = function createServices({
  config = {},
  resourceRelationshipParamsMap = {},
  serviceDefinitions,
  log = defaultLog,
}) {
  const createdServiceNames = []
  const createdServices = Object.keys(serviceDefinitions).reduce(
    (services, serviceName) => {
      if (config && config.services && !config.services[serviceName]) {
        log.scope().info(`Not adding service: ${serviceName}`)
        return services
      }

      const service = createService({
        resourceRelationshipParamsMap,
        serviceDefinition: serviceDefinitions[serviceName],
        serviceName,
      })

      createdServiceNames.push(serviceName)

      return {
        ...services,
        [serviceName]: service,
      }
    },
    {}
  )

  return createdServices
}
