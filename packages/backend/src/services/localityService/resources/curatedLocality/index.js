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
            'Levels of descendants to include. Only relevant if relationships descendants provided',
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
          description: 'Add includes',
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
      includeRelations: false,
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
