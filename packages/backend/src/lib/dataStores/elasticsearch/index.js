const createLog = require('../../../utilities/log')
const connectDb = require('./db')

const log = createLog('lib/dataStores/elasticsearch')

module.exports = function initializeElasticsearch({ config }) {
  log.info('Initialize sequelize started')
  return Promise.resolve().then(() => {
    return connectDb({ config }).then(elasticsearch => {
      return elasticsearch
    })
  })
}
