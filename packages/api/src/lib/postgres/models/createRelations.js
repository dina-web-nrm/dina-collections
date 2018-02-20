const createLog = require('../../../utilities/log')

const log = createLog('lib/postgres/models/setupRelations')

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
          const { name, factory } = model
          if (name !== 'setupRelations') {
            return null
          }
          return {
            apiName,
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
            apiName,
            setupRelations,
          }
        })
      }

      return [...modelFactories, ...endpointSetupRelations]
    }, [])
    .filter(setupRelations => !!setupRelations)
}

module.exports = function createRelations({ apis, models }) {
  log.debug('Create relations started')
  const setupRelationFunctions = extractSetupRelationsFromApis(apis)
  return Promise.all(
    setupRelationFunctions.map(({ apiName, setupRelations }) => {
      log.debug(`Create relations for ${apiName}`)
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
