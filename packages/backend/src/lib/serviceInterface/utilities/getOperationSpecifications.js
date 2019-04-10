module.exports = function getOperationSpecifications({
  serviceSpecifications = {},
}) {
  const operationConfigurations = []
  Object.keys(serviceSpecifications).forEach(service => {
    const resources = serviceSpecifications[service].resources || {}
    Object.keys(resources).forEach(resourceName => {
      const resourceOperations = resources[resourceName].operations
      Object.keys(resourceOperations).forEach(operationId => {
        const operation = resourceOperations[operationId]
        operationConfigurations.push(operation)
      })
    })
  })
  return operationConfigurations
}
