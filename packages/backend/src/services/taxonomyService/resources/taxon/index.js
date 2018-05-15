const buildOperationId = require('common/src/buildOperationId')
const createTaxonRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'taxon'

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      exampleRequests: { primary: createTaxonRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      includeRelations: true,
      type: 'getMany',
    },
    {
      type: 'update',
    },
    {
      type: 'del',
    },
    {
      relationKey: 'parent',
      type: 'updateRelationHasOne',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationBelongsToOne',
        relationKey: 'acceptedToTaxon',
        resource: 'taxonName',
      }),
      relationKey: 'acceptedTaxonName',
      type: 'updateRelationHasOne',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationBelongsToOne',
        relationKey: 'synonymToTaxon',
        resource: 'taxonName',
      }),
      relationKey: 'synonyms',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'synonyms',
      type: 'getRelationHasMany',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationBelongsToOne',
        relationKey: 'vernacularToTaxon',
        resource: 'taxonName',
      }),
      relationKey: 'vernacularNames',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'vernacularNames',
      type: 'getRelationHasMany',
    },
  ],
  relations: resourceRelationsMap[resource],
  resource,
  resourcePath: 'taxa',
}
