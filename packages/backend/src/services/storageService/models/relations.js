const buildResourceRelationsMap = require('../../../lib/services/relations/buildResourceRelationsMap')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

/* eslint-disable sort-keys */
const relationships = [
  {
    sourceResource: 'storageLocation',
    type: 'hasMany',
    targetResource: 'physicalObject',
  },
  {
    sourceResource: 'physicalObject',
    type: 'belongsToOne',
    targetResource: 'storageLocation',
  },
  {
    sourceResource: 'physicalObject',
    type: 'hasMany',
    targetResource: 'specimen',
    external: true,
  },
  {
    sourceResource: 'storageLocation',
    type: 'parent',
  },
  {
    sourceResource: 'storageLocation',
    type: 'children',
  },
  {
    external: true,
    sourceResource: 'storageLocation',
    targetAs: 'acceptedTaxonNames',
    targetResource: 'taxonName',
    type: 'belongsToMany',
  },
]

exports.resourceRelationsMap = buildResourceRelationsMap(relationships)
exports.setupRelations = createSetupRelations(relationships)
