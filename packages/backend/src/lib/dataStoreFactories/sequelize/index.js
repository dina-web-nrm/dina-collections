const createLog = require('../../../utilities/log')
const connectDb = require('./db')

const defaultLog = createLog('lib/dataStoreFactories/sequelize')

module.exports = function initializeSequelize({ config, log = defaultLog }) {
  return Promise.resolve().then(() => {
    return connectDb({ config, log }).then(sequelize => {
      return sequelize
    })
  })
}
