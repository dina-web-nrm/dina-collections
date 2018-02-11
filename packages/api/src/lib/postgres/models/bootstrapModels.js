const extractModelsFromApis = apis => {
  return Object.keys(apis)
    .reduce((modelFactories, apiName) => {
      const api = apis[apiName]
      const { models } = api
      if (!models) {
        return modelFactories
      }

      return [
        ...modelFactories,
        ...Object.keys(models).map(modelName => {
          const modelFactory = models[modelName]
          return {
            modelFactory,
            name: modelName,
          }
        }),
      ]
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
    return models.reduce((obj, { model, name }) => {
      return {
        ...obj,
        [name]: model,
      }
    }, {})
  })
}
