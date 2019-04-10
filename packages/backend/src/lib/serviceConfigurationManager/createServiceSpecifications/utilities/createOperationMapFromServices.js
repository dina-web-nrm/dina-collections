module.exports = function createOperationMapFromServices(services = {}) {
  let operationMap = {}

  Object.keys(services).forEach(serviceKey => {
    const resources = services[serviceKey].resources || {}
    Object.keys(resources).forEach(resourceName => {
      const resourceOperations = resources[resourceName].operations
      operationMap = { ...operationMap, ...resourceOperations }
    })
  })
  return operationMap
}
