module.exports = function getModelSpecifications({
  serviceSpecifications,
  serviceOrder,
}) {
  let modelSpecifications = []
  serviceOrder
    .filter(serviceName => {
      return !!serviceSpecifications[serviceName]
    })

    .forEach(serviceName => {
      const { resources, resourceOrder } = serviceSpecifications[serviceName]

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
      const { models: serviceModels } = serviceSpecifications[serviceName]

      if (serviceModels) {
        modelSpecifications = [...modelSpecifications, ...serviceModels]
      }
    })
  return modelSpecifications
}
