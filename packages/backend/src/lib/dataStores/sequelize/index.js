const createLog = require('../../../utilities/log')
const connectDb = require('./db')

const log = createLog('lib/dataStores/sequelize')

module.exports = function initializeSequelize({ config }) {
  log.info('Initialize sequelize started')
  return Promise.resolve().then(() => {
    return connectDb({ config }).then(sequelize => {
      return sequelize
    })
  })
}
