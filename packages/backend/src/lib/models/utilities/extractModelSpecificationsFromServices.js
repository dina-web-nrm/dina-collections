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
      const { models: serviceModels } = services[serviceName]
      if (serviceModels) {
        models = [...models, ...serviceModels]
      }
    })
  return models
}
