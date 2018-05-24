const createRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'agent'

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
    // {
    //   relationKey: 'user',
    //   type: 'getRelationBelongsToOne',
    // },
    // {
    //   relationKey: 'user',
    //   type: 'updateRelationBelongsToOne',
    // },
  ],
  relations: resourceRelationsMap[resource],
  resource,
}
