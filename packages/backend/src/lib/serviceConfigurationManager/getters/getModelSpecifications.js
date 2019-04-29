module.exports = function getModelSpecifications({ serviceSpecifications }) {
  const modelSpecifications = []
  Object.keys(serviceSpecifications)
    .filter(serviceName => {
      return !!serviceSpecifications[serviceName]
    })

    .forEach(serviceName => {
      const { resources } = serviceSpecifications[serviceName]

      if (resources) {
        const keys = Object.keys(resources)
        keys.forEach(resourceKey => {
          const resource = resources[resourceKey]
          if (resource && resource.model) {
            modelSpecifications.push(resource.model)
          }
        })
      }
    })
  return modelSpecifications
}
