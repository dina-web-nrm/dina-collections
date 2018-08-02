const createLog = require('../../utilities/log')
const synchronizeModels = require('./synchronizeModels')
const createModels = require('./createModels')
const createRelations = require('./createRelations')

const log = createLog('lib/models')

module.exports = function setupModels({
  config,
  elasticsearch,
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
      elasticsearch,
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
          return { models }
        })
    })
  })
}
