const createLog = require('../../../utilities/log')
const createResource = require('../resourceFactory')
const createServiceSpecification = require('./createServiceSpecification')

const log = createLog('lib/services', 1)

module.exports = function createService({
  serviceDefinition: serviceSpecificationInput,
}) {
  log.info(`Create service ${serviceSpecificationInput.name}`)
  const serviceSpecification = createServiceSpecification(
    serviceSpecificationInput
  )
  const { resources: resourceInputs = {} } = serviceSpecification

  log.info('Create resources')
  const resources = Object.keys(resourceInputs).reduce((obj, resourceName) => {
    const resourceInput = resourceInputs[resourceName]
    return {
      ...obj,
      [resourceName]: createResource({
        resourceInput,
        resourceName,
      }),
    }
  }, {})

  return {
    ...serviceSpecification,
    resources,
  }
}
