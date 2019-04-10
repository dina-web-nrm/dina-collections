const modelFactories = require('../../../modelFactories')

module.exports = function createModels({
  config,
  elasticsearch,
  inMemoryDb,
  sequelize,
  modelSpecifications,
}) {
  return Promise.all(
    modelSpecifications.map(
      ({ modelFactory: modelFactoryName, name, ...rest }) => {
        const modelFactory = modelFactories[modelFactoryName]
        if (!modelFactory) {
          throw new Error(`Unknown model factory type: ${modelFactoryName}`)
        }

        const model = modelFactory({
          config,
          elasticsearch,
          inMemoryDb,
          name,
          sequelize,
          ...rest,
        })
        return { model, name }
      }
    )
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
