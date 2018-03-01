const createLog = require('../../../utilities/log')
const Sequelize = require('sequelize')

const log = createLog('lib/postgres')

module.exports = function createDb({ config }) {
  const { database, password, url, username } = config.db
  const connectionString = `postgres://${username}:${password}@${url}/${
    database
  }`
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging:
      config.log.db &&
      (entry => {
        log.debug(entry)
      }),
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
