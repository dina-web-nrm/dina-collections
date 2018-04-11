const createStorageLocationRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createStorageLocationRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    // {
    //   relationKey: 'physicalObjects',
    //   type: 'updateRelationHasMany',
    // },
    {
      relationKey: 'physicalObjects',
      type: 'getRelationHasMany',
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
  relations: {
    physicalObjects: {
      format: 'array',
      resource: 'physicalObject',
    },
  },
  resource: 'storageLocation',
}
