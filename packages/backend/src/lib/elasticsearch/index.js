const createLog = require('../../utilities/log')
const connectDb = require('./db')

const log = createLog('lib/elasticsearch')

module.exports = function initializeElasticsearch({ config }) {
  log.info('Initialize elasticsearch started')
  return Promise.resolve().then(() => {
    return connectDb({ config }).then(elasticsearch => {
      return { elasticsearch }
    })
  })
}
