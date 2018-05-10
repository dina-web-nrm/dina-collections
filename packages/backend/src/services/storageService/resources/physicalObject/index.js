const buildOperationId = require('common/src/buildOperationId')
const createPhysicalObjectRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'physicalObject'

module.exports = {
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createPhysicalObjectRequestSuccess },
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
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'getRelationBelongsToOne',
        relationKey: 'physicalObject',
        resource: 'specimen',
      }),
      relationKey: 'specimens',
      type: 'getRelationHasMany',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationBelongsToOne',
        relationKey: 'physicalObject',
        resource: 'specimen',
      }),
      relationKey: 'specimens',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'storageLocation',
      type: 'updateRelationBelongsToOne',
    },
    {
      relationKey: 'storageLocation',
      type: 'getRelationBelongsToOne',
    },
  ],
  relations: resourceRelationsMap[resource],
  resource,
}
