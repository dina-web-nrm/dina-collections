const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./create/examples/requestSuccess.json')
const getManyFilters = require('./getMany/filters')

module.exports = {
  basePath: '/api/locality/v01',
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      queryParams: {
        relationships: {
          description: 'Add relationships. example [descendants, children]',
          required: false,
          schema: {
            items: {
              enum: ['descendants', 'children'],
              type: 'string',
            },
            type: 'array',
          },
        },
      },
      type: 'getOne',
    },
    {
      filters: getManyFilters,
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
      relationKey: 'children',
      type: 'getRelationship',
    },
    {
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'parent',
        resource: 'taxonName',
      }),
      relationKey: 'children',
      type: 'updateRelationship',
    },
    {
      relationKey: 'parent',
      type: 'getRelationship',
    },
    {
      relationKey: 'parent',
      type: 'updateRelationship',
    },
  ],
  resource: 'place',
}
