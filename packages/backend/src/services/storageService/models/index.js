const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

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

const setupRelations = function setupRelations({ models }) {
  const { physicalObject, storageLocation } = models
  storageLocation.Model.hasMany(storageLocation.Model, {
    as: 'children',
    foreignKey: 'parentVersionId',
  })
  storageLocation.Model.belongsTo(storageLocation.Model, {
    as: 'parent',
    foreignKey: 'parentVersionId',
    targetKey: 'versionId',
  })
  storageLocation.Model.hasMany(physicalObject.Model, {
    as: 'physicalObjects',
    foreignKey: 'storageLocationVersionId',
  })
  physicalObject.Model.belongsTo(storageLocation.Model, {
    as: 'storageLocation',
    foreignKey: 'storageLocationVersionId',
    targetKey: 'versionId',
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
