const createModel = require('../../../modelFactories/versionedDocumentModel')

const physicalUnitModelFactory = function physicalUnit({ sequelize }) {
  return createModel({
    name: 'PhysicalUnit',
    schemaModelName: 'physicalUnit',
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

const setupRelations = function setupRelations({ models }) {
  const { physicalUnit, storageLocation } = models

  physicalUnit.Model.belongsTo(storageLocation.Model, { as: 'storageLocation' })
}

module.exports = [
  {
    factory: storageLocationModelFactory,
    name: 'storageLocation',
  },
  {
    factory: physicalUnitModelFactory,
    name: 'physicalUnit',
  },
  {
    factory: setupRelations,
    name: 'setupRelations',
  },
]
