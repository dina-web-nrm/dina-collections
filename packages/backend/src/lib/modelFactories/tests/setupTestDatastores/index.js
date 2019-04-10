const createInMemoryDb = require('../../../dataStoreFactories/inMemory/db')
const createSequalizeDb = require('../../../dataStoreFactories/sequelize/db')
const createElasticsearchDb = require('../../../dataStoreFactories/elasticsearch/db')

let cacheConnections = null

module.exports = function setupTestDatastores({ config }) {
  const { runDbTests } = config.test
  if (cacheConnections) {
    return Promise.resolve(cacheConnections)
  }

  if (!runDbTests) {
    return createInMemoryDb({ config }).then(inMemoryDb => {
      return {
        inMemoryDb,
      }
    })
  }
  return Promise.all([
    createInMemoryDb({ config }),
    createSequalizeDb({ config }),
    createElasticsearchDb({ config }),
  ]).then(([inMemoryDb, sequelize, elasticsearch]) => {
    cacheConnections = {
      elasticsearch,
      inMemoryDb,
      sequelize,
    }
    return {
      elasticsearch,
      inMemoryDb,
      sequelize,
    }
  })
}
