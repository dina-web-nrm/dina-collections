const createResourceSpecification = require('../createResourceSpecification')

module.exports = function createService({
  log,
  resourceRelationshipParamsMap,
  serviceConfiguration,
  serviceName,
}) {
  const {
    basePath,
    resources: resourceConfigurations = {},
  } = serviceConfiguration

  if (log) {
    log.info('Create resources')
  }

  const resources = Object.keys(resourceConfigurations).reduce(
    (obj, resourceName) => {
      const resourceConfiguration = {
        ...resourceConfigurations[resourceName],
        relations: resourceRelationshipParamsMap[resourceName] || {},
      }

      return {
        ...obj,
        [resourceName]: createResourceSpecification({
          basePath,
          resourceConfiguration,
          serviceName,
        }),
      }
    },
    {}
  )

  return {
    ...serviceConfiguration,
    basePath,
    resources,
  }
}
