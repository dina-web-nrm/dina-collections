const createLog = require('../../utilities/log')
// const syncModels = require('./models/syncModels')
// const createModels = require('./models/createModels')
// const createRelations = require('./models/createRelations')
const createDb = require('./db')

const log = createLog('lib/postgres')

module.exports = function bootstrapDatalayer({ config }) {
  log.info('Bootstrap postgres started')
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return { sequelize }
      // return createModels({ apis, config, sequelize }).then(
      //   ({ modelArray, modelObject: models }) => {
      //     return createRelations({ apis, models }).then(() => {
      //       return syncModels({ config, modelArray, models }).then(() => {
      //         log.info('Bootstrap postgres done')
      //         return {
      //           models,
      //         }
      //       })
      //     })
      //   }
      // )
    })
  })
}
