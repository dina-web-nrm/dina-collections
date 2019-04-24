module.exports = function getModelSpecifications({ serviceSpecifications }) {
  const { services } = serviceSpecifications
  let modelSpecifications = []
  Object.keys(services)
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
            modelSpecifications.push(resource.model)
          }
        })
      }
      // TODO can this be removed?
      const { models: serviceModels } = services[serviceName]

      if (serviceModels) {
        modelSpecifications = [...modelSpecifications, ...serviceModels]
      }
    })
  return modelSpecifications
}
