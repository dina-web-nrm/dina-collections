const createModel = require('../../../lib/sequelize/models/factories/documentModel')
const loadInitialData = require('./loadInitialData')
const { setupRelations } = require('./relations')

const physicalObjectModelFactory = function physicalObject({ sequelize }) {
  return createModel({
    name: 'PhysicalObject',
    schemaModelName: 'physicalObject',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const storageLocationModelFactory = function storageLocation({ sequelize }) {
  return createModel({
    name: 'StorageLocation',
    schemaModelName: 'storageLocation',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

module.exports = [
  {
    factory: storageLocationModelFactory,
    name: 'storageLocation',
  },
  {
    factory: physicalObjectModelFactory,
    name: 'physicalObject',
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
