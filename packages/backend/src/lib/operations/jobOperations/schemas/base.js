module.exports = {
  additionalProperties: false,
  properties: {
    connect: {
      type: 'boolean',
    },
    controller: {
      type: 'string',
    },
    errors: {
      type: 'object',
    },
    exampleResponses: {
      type: 'object',
    },
    operationId: {
      type: 'string',
    },
    postHooks: {
      type: 'array',
    },
    preHooks: {
      type: 'array',
    },
    type: {
      type: 'string',
    },
  },
  required: ['type'],
}
