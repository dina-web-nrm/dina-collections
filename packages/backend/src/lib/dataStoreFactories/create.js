const createElasticsearch = require('./elasticsearch')
const createSequelize = require('./sequelize')
const createInMemory = require('./inMemory')

module.exports = function initialize({ config, log }) {
  return Promise.all([
    createSequelize({ config, log }),
    createInMemory({ config, log }),
    createElasticsearch({ config, log }),
  ]).then(([sequelize, inMemoryDb, elasticsearch]) => {
    return {
      elasticsearch,
      inMemoryDb,
      sequelize,
    }
  })
}
