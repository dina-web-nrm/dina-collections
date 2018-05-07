const buildResourceRelationsMap = require('../../../lib/services/relations/buildResourceRelationsMap')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

/* eslint-disable sort-keys */
const relationships = [
  {
    sourceResource: 'taxon',
    type: 'hasOne',
    targetResource: 'taxonName',
    targetAs: 'acceptedTaxonName',
    foreignKey: 'acceptedToTaxonVersionId',
    allowNull: true,
  },
  {
    sourceResource: 'taxonName',
    type: 'belongsToOne',
    targetResource: 'taxon',
    targetAs: 'acceptedToTaxon',
    foreignKey: 'acceptedToTaxonVersionId',
    allowNull: true,
  },
  {
    sourceResource: 'taxon',
    type: 'hasMany',
    targetResource: 'taxonName',
    targetAs: 'synonyms',
    foreignKey: 'synonymToTaxonVersionId',
    allowNull: true,
  },
  {
    sourceResource: 'taxonName',
    type: 'belongsToOne',
    targetResource: 'taxon',
    targetAs: 'synonymToTaxon',
    foreignKey: 'synonymToTaxonVersionId',
    allowNull: true,
  },
  {
    sourceResource: 'taxon',
    type: 'hasMany',
    targetResource: 'taxonName',
    targetAs: 'vernacularNames',
    foreignKey: 'vernacularToTaxonVersionId',
    allowNull: true,
  },
  {
    sourceResource: 'taxonName',
    type: 'belongsToOne',
    targetResource: 'taxon',
    targetAs: 'vernacularToTaxon',
    foreignKey: 'vernacularToTaxonVersionId',
    allowNull: true,
  },
  {
    sourceResource: 'taxon',
    type: 'parent',
    allowNull: true,
  },
  {
    sourceResource: 'taxon',
    type: 'children',
  },
]

exports.resourceRelationsMap = buildResourceRelationsMap(relationships)
exports.setupRelations = createSetupRelations(relationships)
