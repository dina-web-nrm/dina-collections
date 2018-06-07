const createLog = require('../../utilities/log')
const extractModelSpecificationsFromServices = require('./utilities/extractModelSpecificationsFromServices')
const modelFactories = require('./factories')

const log = createLog('lib/models', 1)

module.exports = function createModels({
  config,
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
        log.debug(name)
        const modelFactory = modelFactories[modelFactoryName]
        if (!modelFactory) {
          throw new Error(`Unknown model factory type: ${modelFactoryName}`)
        }

        const model = modelFactory({
          config,
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
