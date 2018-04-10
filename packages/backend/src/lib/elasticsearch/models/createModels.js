const extractModelFunctionsFromServices = require('./utilities/extractModelFunctionsFromServices')
const createLog = require('../../../utilities/log')

const log = createLog('lib/elasticsearch', 1)

module.exports = function createModels({ services, config, elasticsearch }) {
  const modelFactories = extractModelFunctionsFromServices({
    functionType: 'modelFactory',
    services,
  })
  return Promise.all(
    modelFactories.map(({ name, modelFunction }) => {
      log.debug(name)
      const model = modelFunction({
        config,
        elasticsearch,
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
    log.debug('Create models done')
    return {
      modelArray: models,
      modelObject,
    }
  })
}
