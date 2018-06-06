const createRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/agent/v01',
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
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
      relationKey: 'user',
      type: 'getRelationship',
    },
    {
      relationKey: 'user',
      type: 'updateRelationship',
    },
  ],
  resource: 'agent',
}
