// const buildOperationId = require('common/src/buildOperationId')
const createPhysicalObjectRequestSuccess = require('./operations/create/examples/requestSuccess.json')

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
    // {
    //   connect: false,
    //   inverseOperationId: buildOperationId({
    //     operationType: 'getRelationship',
    //     relationKey: 'physicalObjects',
    //     resource: 'specimen',
    //   }),
    //   relationKey: 'specimens',
    //   type: 'getRelationship',
    // },
    // {
    //   connect: false,
    //   inverseOperationId: buildOperationId({
    //     operationType: 'updateRelationship',
    //     relationKey: 'physicalObjects',
    //     resource: 'specimen',
    //   }),
    //   relationKey: 'specimens',
    //   type: 'updateRelationship',
    // },
    {
      relationKey: 'storageLocation',
      type: 'getRelationship',
    },
    {
      relationKey: 'storageLocation',
      type: 'updateRelationship',
    },
  ],
  resource: 'physicalObject',
}
