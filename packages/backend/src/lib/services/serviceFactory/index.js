const createResource = require('../resourceFactory')
const createServiceSpecification = require('./createServiceSpecification')

module.exports = function createService(serviceSpecificationInput) {
  const serviceSpecification = createServiceSpecification(
    serviceSpecificationInput
  )
  const { resources: resourceInputs = {} } = serviceSpecification

  const resources = Object.keys(resourceInputs).reduce((obj, resourceName) => {
    const resourceInput = resourceInputs[resourceName]
    return {
      ...obj,
      [resourceName]: createResource(resourceInput),
    }
  })

  return {
    ...serviceSpecification,
    resources,
  }
}
