const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')
const { setupRelations } = require('./relations')

const placeFactory = function place({ sequelize }) {
  return createModel({
    name: 'Place',
    schemaModelName: 'place',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

module.exports = [
  {
    factory: placeFactory,
    name: 'place',
  },
  {
    factory: setupRelations,
    name: 'setupRelations',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
