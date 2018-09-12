module.exports = {
  additionalProperties: false,
  properties: {
    description: {
      type: 'string',
    },
    elasticsearch: {
      not: {
        type: 'string',
      },
    },

    inputSchema: {
      type: 'object',
    },
    interceptor: {
      not: {
        type: 'string',
      },
    },
    jsFilterFunction: {
      not: {
        type: 'string',
      },
    },
    key: {
      type: 'string',
    },
    operationId: {
      type: 'string',
    },

    sequelizeFilterFunction: {
      not: {
        type: 'string',
      },
    },
    type: {
      type: 'string',
    },
  },
  required: ['inputSchema', 'description', 'key'],
}
