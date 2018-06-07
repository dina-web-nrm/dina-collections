const initializeSequelize = require('./sequelize')
const initializeInMemory = require('./inMemory')

module.exports = function initialize(config) {
  return Promise.all([
    initializeSequelize({ config }),
    initializeInMemory({ config }),
  ]).then((sequelize, inMemoryDb) => {
    return {
      inMemoryDb,
      sequelize,
    }
  })
}
