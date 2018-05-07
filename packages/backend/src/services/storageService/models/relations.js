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
]

exports.resourceRelationsMap = buildResourceRelationsMap(relationships)
exports.setupRelations = createSetupRelations(relationships)
