const createLog = require('../../utilities/log')
const createElasticsearch = require('./elasticsearch')
const createSequelize = require('./sequelize')
const createInMemory = require('./inMemory')

const defaultLog = createLog('lib/dataStores')

module.exports = function createDataStores({ config, log = defaultLog }) {
  log.info('creating data stores')
  const scopedLog = log.scope()
  return Promise.all([
    createSequelize({ config, log: scopedLog }),
    createInMemory({ config, log: scopedLog }),
    createElasticsearch({ config, log: scopedLog }),
  ]).then(([sequelize, inMemoryDb, elasticsearch]) => {
    return {
      elasticsearch,
      inMemoryDb,
      sequelize,
    }
  })
}
