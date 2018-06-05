const buildOperationId = require('common/src/buildOperationId')
const createStorageLocationRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const buildWhere = require('./operations/getMany/buildWhere')

module.exports = {
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createStorageLocationRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      queryParams: {
        'filter[descendantLevels]': {
          description:
            'NOT IMPLEMENTED - Levels of descendants to include. Only relevant if relationships descendants provided. example: [level 3, level 4]',
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
          description: 'Filter by string search, example bone room',
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
        resource: 'storageLocation',
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
    {
      relationKey: 'physicalObjects',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'storageLocation',
        resource: 'physicalObject',
      }),
      relationKey: 'physicalObjects',
      type: 'updateRelationship',
    },
  ],
  resource: 'storageLocation',
}
