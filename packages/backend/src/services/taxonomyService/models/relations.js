const buildResourceRelationsMap = require('../../../lib/services/relations/buildResourceRelationsMap')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

/* eslint-disable sort-keys */
const relationships = [
  {
    sourceResource: 'taxon',
    type: 'hasOne',
    targetResource: 'taxonName',
    targetAs: 'acceptedTaxonName',
    foreignKey: 'acceptedToTaxonId',
    allowNull: true,
  },
  {
    sourceResource: 'taxonName',
    type: 'belongsToOne',
    targetResource: 'taxon',
    targetAs: 'acceptedToTaxon',
    foreignKey: 'acceptedToTaxonId',
    allowNull: true,
  },
  {
    sourceResource: 'taxon',
    type: 'hasMany',
    targetResource: 'taxonName',
    targetAs: 'synonyms',
    foreignKey: 'synonymToTaxonId',
    allowNull: true,
  },
  {
    sourceResource: 'taxonName',
    type: 'belongsToOne',
    targetResource: 'taxon',
    targetAs: 'synonymToTaxon',
    foreignKey: 'synonymToTaxonId',
    allowNull: true,
  },
  {
    sourceResource: 'taxon',
    type: 'hasMany',
    targetResource: 'taxonName',
    targetAs: 'vernacularNames',
    foreignKey: 'vernacularToTaxonId',
    allowNull: true,
  },
  {
    sourceResource: 'taxonName',
    type: 'belongsToOne',
    targetResource: 'taxon',
    targetAs: 'vernacularToTaxon',
    foreignKey: 'vernacularToTaxonId',
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
