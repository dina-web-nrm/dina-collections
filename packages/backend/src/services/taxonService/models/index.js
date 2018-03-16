const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

const taxonFactory = function taxon({ sequelize }) {
  return createModel({
    name: 'Taxon',
    schemaModelName: 'taxon',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const setupRelations = function setupRelations({ models }) {
  const { taxon } = models
  taxon.Model.hasMany(taxon.Model, {
    as: 'children',
    foreignKey: 'parentVersionId',
  })
  taxon.Model.belongsTo(taxon.Model, {
    as: 'parent',
    foreignKey: 'parentVersionId',
    targetKey: 'versionId',
  })
}

module.exports = [
  {
    factory: taxonFactory,
    name: 'taxon',
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
