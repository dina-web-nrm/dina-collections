module.exports = function getOperationSpecifications({
  serviceSpecifications = {},
}) {
  const { services } = serviceSpecifications
  const operationSpecifications = []
  Object.keys(services).forEach(service => {
    const resources = services[service].resources || {}
    Object.keys(resources).forEach(resourceName => {
      const resourceOperations = resources[resourceName].operations
      Object.keys(resourceOperations).forEach(operationId => {
        const operation = resourceOperations[operationId]
        operationSpecifications.push(operation)
      })
    })
  })
  return operationSpecifications
}
