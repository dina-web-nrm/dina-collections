const createLog = require('../../../utilities/log')
const syncModels = require('./syncModels')
const createModels = require('./createModels')
const createRelations = require('./createRelations')

const log = createLog('lib/postgres')

module.exports = function setupModels({ config, sequelize, services }) {
  log.info('Setup models:')
  return Promise.resolve().then(() => {
    return createModels({ config, log: log.scope(), sequelize, services }).then(
      ({ modelArray, modelObject: models }) => {
        log.info('Setup relations:')
        return createRelations({
          log: log.scope(),
          models,
          services,
        }).then(() => {
          return syncModels({
            config,
            log: log.scope(),
            modelArray,
            models,
          }).then(() => {
            log.info('Setup models done')

            return {
              models,
            }
          })
        })
      }
    )
  })
}
