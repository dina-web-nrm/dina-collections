const createPhysicalObjectRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createPhysicalObjectRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      relationKey: 'storageLocation',
      type: 'updateRelationHasOne',
    },
    {
      relationKey: 'storageLocation',
      type: 'getRelationHasOne',
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
      type: 'getVersion',
    },
    {
      type: 'getVersions',
    },
  ],
  relations: {
    storageLocation: {
      format: 'object',
      resource: 'storageLocation',
      type: 'hasOne',
    },
  },
  resource: 'physicalObject',
}
