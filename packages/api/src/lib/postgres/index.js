const createLog = require('../../utilities/log')
const syncModels = require('./models/syncModels')
const bootstrapModels = require('./models/bootstrapModels')
const setupRelations = require('./models/setupRelations')
const createDb = require('./db')

const log = createLog('lib/postgres')

module.exports = function bootstrapDatalayer({ apis, config }) {
  log.info('Bootstrap postgres started')
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return bootstrapModels({ apis, config, sequelize }).then(
        ({ modelArray, modelObject: models }) => {
          return setupRelations({ apis, models }).then(() => {
            return syncModels({ config, modelArray, models }).then(() => {
              log.info('Bootstrap postgres done')
              return {
                models,
              }
            })
          })
        }
      )
    })
  })
}
