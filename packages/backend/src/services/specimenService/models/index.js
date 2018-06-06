const {
  getNormalizedColumnNames,
} = require('common/src/formatObject/specifications')

const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/documentModel')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

const normalizedColumnNames = getNormalizedColumnNames('specimen')

const specimenFactory = function specimen({ sequelize }) {
  return createModel({
    name: 'Specimen',
    normalizedColumnNames,
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
    factory: createSetupRelations(['specimen']),
    name: 'setupRelations',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
