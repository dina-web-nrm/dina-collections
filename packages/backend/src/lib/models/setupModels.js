const createLog = require('../../utilities/log')
const synchronizeModels = require('./synchronizeModels')
const loadInitialData = require('./loadInitialData')
const createModels = require('./createModels')
const createRelations = require('./createRelations')

const log = createLog('lib/models')

module.exports = function setupModels({
  config,
  inMemoryDb,
  sequelize,
  serviceOrder,
  services,
}) {
  log.info('Setup models')
  return Promise.resolve().then(() => {
    log.info('Create Models:')
    return createModels({
      config,
      inMemoryDb,
      sequelize,
      serviceOrder,
      services,
    }).then(({ modelArray, modelObject: models }) => {
      log.info('Setup relations:')
      return createRelations({ modelArray, models })
        .then(() => {
          return synchronizeModels({
            config,
            modelArray,
          })
        })
        .then(() => {
          log.info('Load initial data:')
          return loadInitialData({
            config,
            modelArray,
            models,
          }).then(() => {
            return { models }
          })
        })
    })
  })
}
