module.exports = {
  additionalProperties: false,
  properties: {
    basePath: {
      description: 'Optional override for serviceConfiguration basePath',
      type: 'string',
    },
    migrations: {
      type: 'object',
    },
    model: {
      description: 'Model configuration (see modelConfiguration schema)',
      type: 'object',
    },
    operations: {
      description:
        'OperationConfigurations (see operationConfiguration schema)',
      type: 'array',
    },
    resource: {
      description: 'Name of the resource',
      type: 'string',
    },
    resourcePath: {
      description:
        'Custom path to the resource. Will otherwise be created based on resource',
      type: 'string',
    },
  },
  required: ['operations'],
}
