module.exports = {
  additionalProperties: false,
  properties: {
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
    queryParams: {
      type: 'object',
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
  required: ['key', 'queryParams'],
}
