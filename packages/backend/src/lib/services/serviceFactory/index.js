const createResource = require('../resourceFactory')
const createServiceSpecification = require('./createServiceSpecification')

module.exports = function createService({
  log,
  resourceRelationshipParamsMap,
  serviceDefinition: serviceSpecificationInput,
}) {
  log.info(`Create service ${serviceSpecificationInput.name}`)
  const serviceSpecification = createServiceSpecification(
    serviceSpecificationInput
  )
  const { resources: resourceInputs = {} } = serviceSpecification

  log.info('Create resources')
  const resources = Object.keys(resourceInputs).reduce((obj, resourceName) => {
    const resourceInput = {
      ...resourceInputs[resourceName],
      relations: resourceRelationshipParamsMap[resourceName] || {},
    }

    return {
      ...obj,
      [resourceName]: createResource({
        resourceInput,
      }),
    }
  }, {})

  return {
    ...serviceSpecification,
    resources,
  }
}
