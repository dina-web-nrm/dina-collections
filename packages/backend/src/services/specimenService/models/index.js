const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

const specimenFactory = function specimen({ sequelize }) {
  return createModel({
    name: 'Specimen',
    schemaModelName: 'specimen',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

module.exports = [
  {
    factory: specimenFactory,
    name: 'specimen',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
