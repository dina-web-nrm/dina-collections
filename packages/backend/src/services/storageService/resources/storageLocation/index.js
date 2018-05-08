const createStorageLocationRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const buildWhere = require('./operations/getMany/buildWhere')

const { resourceRelationsMap } = require('../../models/relations')

const resource = 'storageLocation'

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
    //   relationKey: 'physicalObjects',
    //   type: 'updateRelationHasMany',
    // },
    {
      relationKey: 'parent',
      type: 'updateRelationHasOne',
    },
    {
      relationKey: 'physicalObjects',
      type: 'getRelationHasMany',
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
  ],
  relations: resourceRelationsMap[resource],
  resource,
}
