// const buildOperationId = require('common/src/buildOperationId')
const createPhysicalObjectRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/storage/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'physicalObject',
    relations: ['storageLocation'],
  },
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
