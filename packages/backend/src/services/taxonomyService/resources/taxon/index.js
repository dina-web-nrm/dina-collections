const buildOperationId = require('../../../../lib/services/operationFactory/typeFactories/utilities/buildOperationId')
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
      type: 'update',
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
      includeRelations: true,
      type: 'getOne',
    },
    {
      includeRelations: true,
      type: 'getMany',
    },
  ],
  relations: resourceRelationsMap[resource],
  resource,
  resourcePath: 'taxa',
}
