const extractSetupRelationsFromApis = services => {
  return Object.keys(services)
    .reduce((modelFactories, serviceName) => {
      const service = services[serviceName]
      const { models } = service
      if (!models) {
        return modelFactories
      }
      let endpointSetupRelations

      if (Array.isArray(models)) {
        endpointSetupRelations = models.map(model => {
          const { name, factory } = model
          if (name !== 'setupRelations') {
            return null
          }
          return {
            serviceName,
            setupRelations: factory,
          }
        })
      } else {
        endpointSetupRelations = Object.keys(models).map(name => {
          if (name !== 'setupRelations') {
            return null
          }
          const setupRelations = models[name].factory
          return {
            serviceName,
            setupRelations,
          }
        })
      }

      return [...modelFactories, ...endpointSetupRelations]
    }, [])
    .filter(setupRelations => !!setupRelations)
}

module.exports = function createRelations({ log, services, models }) {
  log.debug('Create relations:')
  const setupRelationFunctions = extractSetupRelationsFromApis(services)
  return Promise.all(
    setupRelationFunctions.map(({ serviceName, setupRelations }) => {
      log.debug(`${serviceName}`)
      return Promise.resolve(
        setupRelations({
          models,
        })
      )
    })
  ).then(() => {
    log.debug('Create relations done')
  })
}
