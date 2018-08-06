const createInMemoryDb = require('../../../../dataStores/inMemory/db')
const createSequalizeDb = require('../../../../dataStores/sequelize/db')
const createElasticsearchDb = require('../../../../dataStores/elasticsearch/db')

module.exports = function setupTestDatastores({ config, runDbTests }) {
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
    return {
      elasticsearch,
      inMemoryDb,
      sequelize,
    }
  })
}
