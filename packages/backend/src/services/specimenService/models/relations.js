const buildResourceRelationsMap = require('../../../lib/services/relations/buildResourceRelationsMap')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

/* eslint-disable sort-keys */
const relationships = [
  {
    sourceResource: 'specimen',
    type: 'belongsToMany',
    targetResource: 'featureType',
    external: true,
  },
  {
    sourceResource: 'specimen',
    type: 'belongsToMany',
    targetResource: 'physicalObject',
    external: true,
  },
  {
    sourceResource: 'specimen',
    type: 'belongsToMany',
    targetResource: 'place',
    external: true,
  },
  {
    sourceResource: 'specimen',
    type: 'belongsToMany',
    targetAs: 'taxa',
    targetResource: 'taxon',
    external: true,
  },
]

exports.resourceRelationsMap = buildResourceRelationsMap(relationships)
exports.setupRelations = createSetupRelations(relationships)
