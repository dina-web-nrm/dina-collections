module.exports = {
  additionalProperties: false,
  properties: {
    basePath: {
      type: 'string',
    },
    operations: {
      type: 'array',
    },
    relations: {
      type: 'object',
    },
    resource: {
      type: 'string',
    },
    resourcePlural: {
      type: 'string',
    },
  },
  required: ['basePath'],
}
