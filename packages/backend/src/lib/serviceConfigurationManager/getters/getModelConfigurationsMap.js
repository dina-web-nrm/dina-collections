module.exports = function getModelConfigurationsMap({ serviceConfigurations }) {
  const modelConfigurations = {}
  Object.keys(serviceConfigurations)
    .filter(serviceName => {
      return !!serviceConfigurations[serviceName]
    })
    .forEach(serviceName => {
      const { resources } = serviceConfigurations[serviceName]

      if (resources) {
        Object.values(resources).forEach(resource => {
          if (resource.model) {
            modelConfigurations[resource.model.name] = resource.model
          }
        })
      }
    })
  return modelConfigurations
}
