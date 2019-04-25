const createLog = require('../../../utilities/log')
const createServiceSpecification = require('./createServiceSpecification')

const defaultLog = createLog('lib/services')

module.exports = function createServiceSpecifications({
  config = {},
  log = defaultLog,
  resourceRelationshipParamsMap = {},
  serviceConfigurations,
}) {
  log.info('creating service specifications from service configurations')
  log.scope().info('resourceSpecifications from resourceConfigurations')
  log
    .scope()
    .scope()
    .info('modelSpecifications from modelConfigurations')
  log
    .scope()
    .scope()
    .info('operationSpecifications from operationConfigurations')
  const createdServices = Object.keys(serviceConfigurations).reduce(
    (services, serviceName) => {
      if (config && config.services && !config.services[serviceName]) {
        log.scope().info(`Not adding service: ${serviceName}`)
        return services
      }

      const service = createServiceSpecification({
        resourceRelationshipParamsMap,
        serviceConfiguration: serviceConfigurations[serviceName],
        serviceName,
      })
      return {
        ...services,
        [serviceName]: service,
      }
    },
    {}
  )

  return createdServices
}
