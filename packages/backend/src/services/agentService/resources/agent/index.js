const allFromObjectWithComputedId = require('../../../../lib/data/transformations/sharedTransformations/allFromObjectWithComputedId')

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
      transformationSpecification: {
        description: 'Importing agents from file',
        srcFileName: 'agents',
        transformationFunctions: {
          allFromObjectWithComputedId,
        },
      },
      type: 'importDataFromFile',
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
