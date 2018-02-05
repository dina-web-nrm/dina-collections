const extractModelsFromModules = modules => {
  return Object.keys(modules)
    .reduce((modelFactories, moduleName) => {
      const module = modules[moduleName]
      const { models } = module
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

module.exports = function createModels({ config, modules, sequelize }) {
  const rawModels = extractModelsFromModules(modules)
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
