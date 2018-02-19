const extractModelsFromApis = apis => {
  return Object.keys(apis)
    .reduce((modelFactories, apiName) => {
      const api = apis[apiName]
      const { models } = api
      if (!models) {
        return modelFactories
      }
      let endpointModels

      if (Array.isArray(models)) {
        endpointModels = models.map(model => {
          const { name, factory } = model
          if (name === 'setupRelations') {
            return {}
          }
          return {
            modelFactory: factory,
            name,
          }
        })
      } else {
        endpointModels = Object.keys(models).map(name => {
          if (name === 'setupRelations') {
            return {}
          }
          const modelFactory = models[name]
          return {
            modelFactory,
            name,
          }
        })
      }

      return [...modelFactories, ...endpointModels]
    }, [])
    .filter(({ modelFactory }) => !!modelFactory)
}

module.exports = function bootstrapModels({ apis, config, sequelize }) {
  const rawModels = extractModelsFromApis(apis)
  return Promise.all(
    rawModels.map(({ name, modelFactory }) => {
      const model = modelFactory({
        config,
        sequelize,
      })
      return {
        model,
        name,
      }
    })
  ).then(models => {
    const modelObject = models.reduce((obj, { model, name }) => {
      return {
        ...obj,
        [name]: model,
      }
    }, {})
    return {
      modelArray: models,
      modelObject,
    }
  })
}
