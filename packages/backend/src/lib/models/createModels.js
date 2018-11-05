const createLog = require('../../utilities/log')
const extractModelSpecificationsFromServices = require('./utilities/extractModelSpecificationsFromServices')
const modelFactories = require('./factories')

module.exports = function createModels({
  config,
  elasticsearch,
  inMemoryDb,
  sequelize,
  serviceOrder,
  services,
}) {
  const modelSpecifications = extractModelSpecificationsFromServices({
    serviceOrder,
    services,
  })

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
