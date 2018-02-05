const createLog = require('../../../utilities/log')
const Sequelize = require('sequelize')

const log = createLog('logic/db')

module.exports = function createDb({ config }) {
  const { database, password, username } = config.db
  const sequelize = new Sequelize(database, username, password, {
    dialect: 'postgres',
    logging: config.log.db && log.debug,
    operatorsAliases: false,
  })

  return sequelize
    .authenticate()
    .then(() => {
      log.info('Connection has been established successfully.')
      return sequelize
    })
    .catch(err => {
      log.alert('Unable to connect to the database:', err)
      return sequelize
    })
}
