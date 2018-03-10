const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

const curatedLocalityFactory = function curatedLocality({ sequelize }) {
  return createModel({
    name: 'CuratedLocality',
    schemaModelName: 'curatedLocality',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const setupRelations = function setupRelations({ models }) {
  const { curatedLocality } = models
  curatedLocality.Model.hasMany(curatedLocality.Model, {
    as: 'children',
    foreignKey: 'parentVersionId',
  })
  curatedLocality.Model.belongsTo(curatedLocality.Model, {
    as: 'parent',
    foreignKey: 'parentVersionId',
    targetKey: 'versionId',
  })
}

module.exports = [
  {
    factory: curatedLocalityFactory,
    name: 'curatedLocality',
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
