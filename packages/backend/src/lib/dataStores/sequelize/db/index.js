const createLog = require('../../../../utilities/log')
const Sequelize = require('sequelize')

const defaultLog = createLog('lib/sequelize')

module.exports = function connectDb({ config, log = defaultLog }) {
  log.info('connecting to postgres')
  return Promise.resolve().then(() => {
    const { database, password, url, username } = config.db
    const connectionString = `postgres://${username}:${password}@${url}/${database}`
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
        log.info('connection to postgres has been established successfully.')
        return sequelize
      })
      .catch(err => {
        log.alert('unable to connect to the database:', err)
        return sequelize
      })
  })
}
