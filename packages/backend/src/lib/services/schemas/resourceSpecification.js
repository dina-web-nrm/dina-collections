module.exports = {
  additionalProperties: false,
  properties: {
    basePath: {
      type: 'string',
    },
    migrations: {
      type: 'object',
    },
    model: {
      type: 'object',
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
