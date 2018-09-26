module.exports = function extractModelSpecificationsFromServices({
  serviceOrder,
  services,
}) {
  let models = []
  serviceOrder
    .filter(serviceName => {
      return !!services[serviceName]
    })

    .forEach(serviceName => {
      const { resources, resourceOrder } = services[serviceName]

      if (resources) {
        const keys = resourceOrder || Object.keys(resources)
        keys.forEach(resourceKey => {
          const resource = resources[resourceKey]
          if (resource && resource.model) {
            models.push(resource.model)
          }
        })
      }

      const { models: serviceModels } = services[serviceName]

      if (serviceModels) {
        models = [...models, ...serviceModels]
      }
    })
  return models
}
