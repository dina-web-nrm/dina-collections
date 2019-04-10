const createLog = require('../../../utilities/log')
const connectDb = require('./db')

const defaultLog = createLog('lib/dataStoreFactories/inMemory')

module.exports = function initializeInMemory({ log = defaultLog }) {
  log.info('Creating in memmory db')
  return Promise.resolve().then(() => {
    return connectDb().then(inMemoryDb => {
      return inMemoryDb
    })
  })
}
