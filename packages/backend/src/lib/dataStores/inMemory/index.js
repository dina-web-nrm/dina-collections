const createLog = require('../../../utilities/log')
const connectDb = require('./db')

const log = createLog('lib/dataStores/inMemory')

module.exports = function initializeInMemory() {
  log.info('Initialize inMemory started')
  return Promise.resolve().then(() => {
    return connectDb().then(inMemoryDb => {
      return inMemoryDb
    })
  })
}
