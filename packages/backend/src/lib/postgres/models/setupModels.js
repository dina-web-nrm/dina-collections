const createLog = require('../../../utilities/log')
const syncModels = require('./syncModels')
const createModels = require('./createModels')
const createRelations = require('./createRelations')

const log = createLog('lib/postgres')

module.exports = function setupModels({ config, sequelize, services }) {
  log.info('Setup models:')
  return Promise.resolve().then(() => {
    return createModels({ config, sequelize, services }).then(
      ({ modelArray, modelObject: models }) => {
        log.info('Setup relations:')
        return createRelations({
          models,
          services,
        }).then(() => {
          return syncModels({
            config,
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
