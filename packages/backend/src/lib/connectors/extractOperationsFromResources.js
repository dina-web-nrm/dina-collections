module.exports = function exportOperationsFromResources(resources) {
  return Object.keys(resources).reduce((operations, resourceName) => {
    const resourceOperations = resources[resourceName].operations || {}
    return {
      ...operations,
      ...resourceOperations,
    }
  }, {})
}
