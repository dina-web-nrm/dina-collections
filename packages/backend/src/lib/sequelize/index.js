const createLog = require('../../utilities/log')
const createDb = require('./db')

const log = createLog('lib/sequelize')

module.exports = function initializeSequelize({ config }) {
  log.info('Initialize sequelize started')
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return { sequelize }
    })
  })
}
