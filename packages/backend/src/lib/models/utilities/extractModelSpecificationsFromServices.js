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
      const { resources } = services[serviceName]

      if (resources) {
        Object.keys(resources).forEach(resourceKey => {
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
