const loadInitialData = require('./loadInitialData')
const createModel = require('../../../core/models/sequelize/documentModel')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

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
    factory: createSetupRelations(['place']),
    name: 'setupRelations',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]
