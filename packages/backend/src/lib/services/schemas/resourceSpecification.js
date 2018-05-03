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
    resourcePath: {
      type: 'string',
    },
  },
  required: ['basePath'],
}
