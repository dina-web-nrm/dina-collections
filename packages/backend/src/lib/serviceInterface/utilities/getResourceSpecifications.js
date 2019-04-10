module.exports = function getOperationSpecifications({
  serviceSpecifications = {},
}) {
  const resourceConfigurations = []
  Object.keys(serviceSpecifications).forEach(service => {
    const resources = serviceSpecifications[service].resources || {}
    Object.keys(resources).forEach(resourceName => {
      const resource = resources[resourceName]
      resourceConfigurations.push({
        ...resource,
        service,
      })
    })
  })
  return resourceConfigurations
}
