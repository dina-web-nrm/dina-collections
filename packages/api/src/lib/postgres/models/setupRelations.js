const extractSetupRelationsFromApis = apis => {
  return Object.keys(apis)
    .reduce((modelFactories, apiName) => {
      const api = apis[apiName]
      const { models } = api
      if (!models) {
        return modelFactories
      }
      let endpointSetupRelations

      if (Array.isArray(models)) {
        endpointSetupRelations = models.map(model => {
          const { modelName, factory } = model
          if (modelName !== 'setupRelations') {
            return null
          }
          return {
            setupRelations: factory,
          }
        })
      } else {
        endpointSetupRelations = Object.keys(models).map(modelName => {
          if (modelName !== 'setupRelations') {
            return null
          }
          const setupRelations = models[modelName].factory
          return {
            setupRelations,
          }
        })
      }

      return [...modelFactories, ...endpointSetupRelations]
    }, [])
    .filter(setupRelations => !!setupRelations)
}

module.exports = function setupModelRelations({ apis, models }) {
  const setupRelationFunctions = extractSetupRelationsFromApis(apis)
  return Promise.all(
    setupRelationFunctions.map(({ setupRelations }) => {
      return Promise.resolve(
        setupRelations({
          models,
        })
      )
    })
  )
}
