const createLog = require('../../utilities/log')
const createDb = require('./db')

const log = createLog('lib/postgres')

module.exports = function bootstrapDatalayer({ config }) {
  log.info('Bootstrap postgres started')
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return { sequelize }
    })
  })
}
