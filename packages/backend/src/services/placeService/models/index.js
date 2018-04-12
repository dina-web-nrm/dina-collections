const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

const placeFactory = function place({ sequelize }) {
  return createModel({
    name: 'Place',
    schemaModelName: 'place',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const setupRelations = function setupRelations({ models }) {
  const { place } = models
  place.Model.hasMany(place.Model, {
    as: 'children',
    foreignKey: 'parentVersionId',
  })
  place.Model.belongsTo(place.Model, {
    as: 'parent',
    foreignKey: 'parentVersionId',
    targetKey: 'versionId',
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
