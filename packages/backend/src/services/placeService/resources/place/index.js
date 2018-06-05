const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./create/examples/requestSuccess.json')
const buildWhere = require('./getMany/buildWhere')

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
        'filter[descendantLevels]': {
          description:
            'NOT IMPLEMENTED - Levels of descendants to include. Only relevant if relationships descendants provided. example: [country, city]',
          required: false,
          schema: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        includes: {
          description:
            'NOT IMPLEMENTED - Add includes. example [descendants, children]',
          required: false,
          schema: {
            items: {
              enum: ['descendants', 'children'],
              type: 'string',
            },
            type: 'array',
          },
        },
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
      buildWhere,
      includeRelations: true,
      queryParams: {
        'filter[group]': {
          description: 'Filter by group, example: country',
          required: false,
          schema: {
            type: 'string',
          },
        },
        'filter[parentId]': {
          description: 'Filter by parentId, example 123',
          required: false,
          schema: {
            type: 'string',
          },
        },
        'filter[search]': {
          description: 'Filter by string search, example swe',
          required: false,
          schema: {
            type: 'string',
          },
        },
      },
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
