const createRequestSuccess = require('./create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/locality/v01',
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      includeRelations: false,
      queryParams: {
        'filter[descendantLevels]': {
          description:
            'NOT IMPLEMENTED - Levels of descendants to include. Only relevant if relationships descendants provided',
          example: ['country', 'city'],
          required: false,
          schema: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        includes: {
          description: 'NOT IMPLEMENTED - Add includes',
          example: ['descendants', 'children'],
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
          description: 'Add relationships',
          example: ['descendants', 'children'],
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
      controller: 'curatedLocalityGetWhere',
      includeRelations: false,
      queryParams: {
        'filter[group]': {
          description: 'Filter by group',
          example: 'country',
          required: false,
          schema: {
            type: 'string',
          },
        },
        'filter[search]': {
          description: 'Filter by string search',
          example: 'swe',
          required: false,
          schema: {
            type: 'string',
          },
        },
      },
      type: 'getMany',
    },
  ],
  relations: {
    children: {
      format: 'array',
      resource: 'curatedLocality',
    },
    descendants: {
      format: 'array',
      resource: 'curatedLocality',
    },
    parent: {
      format: 'object',
      resource: 'curatedLocality',
    },
  },
  resource: 'curatedLocality',
  resourcePlural: 'curatedLocalities',
}
