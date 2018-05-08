const createLog = require('../../../utilities/log')
const syncModels = require('./syncModels')
const loadInitialData = require('./loadInitialData')
const createModels = require('./createModels')
// const createRelations = require('./createRelations')

const log = createLog('lib/elasticsearch')

module.exports = function setupModels({
  config,
  elasticsearch,
  services,
  sequelizeModels,
}) {
  log.info('Setup models:')
  return Promise.resolve().then(() => {
    return createModels({ config, elasticsearch, services }).then(
      ({ modelArray, modelObject: models }) => {
        log.info('Sync models:')
        return syncModels({
          config,
          modelArray,
          models,
        }).then(() => {
          log.info('Setup models done')
          return loadInitialData({
            config,
            models,
            sequelizeModels,
            services,
          }).then(() => {
            return {
              models,
            }
          })
        })
      }
    )
  })
}
