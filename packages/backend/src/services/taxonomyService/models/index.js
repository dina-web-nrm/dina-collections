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

const taxonNameFactory = function taxonName({ sequelize }) {
  return createModel({
    name: 'TaxonName',
    schemaModelName: 'taxonName',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const setupRelations = function setupRelations({ models }) {
  const { taxon, taxonName } = models
  taxon.Model.hasMany(taxon.Model, {
    as: 'children',
    foreignKey: 'parentVersionId',
  })
  taxon.Model.belongsTo(taxon.Model, {
    as: 'parent',
    foreignKey: 'parentVersionId',
    targetKey: 'versionId',
  })
  taxon.Model.hasOne(taxonName.Model, {
    as: 'acceptedTaxonName',
    foreignKey: 'acceptedToTaxonVersionId',
  })
  taxonName.Model.belongsTo(taxon.Model, {
    as: 'acceptedToTaxon',
    foreignKey: 'acceptedToTaxonVersionId',
    targetKey: 'versionId',
  })
  taxon.Model.hasMany(taxonName.Model, {
    as: 'synonyms',
    foreignKey: 'synonymToTaxonVersionId',
  })
  taxonName.Model.belongsTo(taxon.Model, {
    as: 'synonymToTaxon',
    foreignKey: 'synonymToTaxonVersionId',
    targetKey: 'versionId',
  })
  taxon.Model.hasMany(taxonName.Model, {
    as: 'vernacularNames',
    foreignKey: 'vernacularToTaxonVersionId',
  })
  taxonName.Model.belongsTo(taxon.Model, {
    as: 'vernacularToTaxon',
    foreignKey: 'vernacularToTaxonVersionId',
    targetKey: 'versionId',
  })
}

module.exports = [
  {
    factory: taxonFactory,
    name: 'taxon',
  },
  {
    factory: taxonNameFactory,
    name: 'taxonName',
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
