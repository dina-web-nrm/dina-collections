const createLog = require('../../../utilities/log')

const log = createLog('lib/postgres/models/createModels')

const extractModelsFromApis = services => {
  return Object.keys(services)
    .reduce((modelFactories, serviceName) => {
      const service = services[serviceName]
      const { models } = service
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

module.exports = function createModels({ services, config, sequelize }) {
  log.debug('Create models started')
  const rawModels = extractModelsFromApis(services)
  return Promise.all(
    rawModels.map(({ name, modelFactory }) => {
      log.debug(`Create model: ${name}`)
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
    log.debug('Create models done')
    return {
      modelArray: models,
      modelObject,
    }
  })
}
