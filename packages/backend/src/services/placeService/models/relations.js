const buildResourceRelationsMap = require('../../../lib/services/relations/buildResourceRelationsMap')
const createSetupRelations = require('../../../lib/services/relations/createSetupRelations')

/* eslint-disable sort-keys */
const relations = [
  {
    sourceResource: 'place',
    type: 'parent',
  },
  {
    sourceResource: 'place',
    type: 'children',
  },
]

exports.resourceRelationsMap = buildResourceRelationsMap(relations)
exports.setupRelations = createSetupRelations(relations)
