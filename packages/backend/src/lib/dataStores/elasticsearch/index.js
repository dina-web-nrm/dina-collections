const createLog = require('../../../utilities/log')
const connectDb = require('./db')

const defaultLog = createLog('lib/dataStores/elasticsearch')

module.exports = function initializeElasticsearch({
  config,
  log = defaultLog,
}) {
  return Promise.resolve().then(() => {
    return connectDb({ config, log }).then(elasticsearch => {
      return elasticsearch
    })
  })
}
