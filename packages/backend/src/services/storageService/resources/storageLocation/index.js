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
    //   relationKey: 'physicalUnits',
    //   type: 'updateRelationHasMany',
    // },
    {
      relationKey: 'physicalUnits',
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
    physicalUnits: {
      format: 'array',
      resource: 'physicalUnit',
    },
  },
  resource: 'storageLocation',
}
