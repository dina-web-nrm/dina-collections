const migrations = require('./data/migrations')
const createRequestSuccess = require('./data/exampleRequests/createSuccess.json')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./data/postHooks')

module.exports = {
  basePath: '/api/storage/v01',
  migrations,
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'physicalObject',
    relations: ['storageLocation'],
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      postHooks: createPostHooks,
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
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
      type: 'del',
    },
    {
      relationKey: 'specimens',
      type: 'getRelationship',
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
