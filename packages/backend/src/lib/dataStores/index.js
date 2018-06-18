const initializeElasticsearch = require('./elasticsearch')
const initializeSequelize = require('./sequelize')
const initializeInMemory = require('./inMemory')

module.exports = function initialize({ config }) {
  return Promise.all([
    initializeSequelize({ config }),
    initializeInMemory({ config }),
    initializeElasticsearch({ config }),
  ]).then(([sequelize, inMemoryDb, elasticsearch]) => {
    return {
      elasticsearch,
      inMemoryDb,
      sequelize,
    }
  })
}
