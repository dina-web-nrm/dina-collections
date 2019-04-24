module.exports = {
  additionalProperties: false,
  properties: {
    basePath: {
      descrition:
        'The base path for the service. Resources will be mounted under this path',
      type: 'string',
    },
    controllers: {
      description: 'Custom controllers used by operations in the service',
      type: 'object',
    },
    info: {
      description: 'Object containing service information',
      properties: {
        description: {
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
    name: {
      description: 'Name of the service',
      type: 'string',
    },
    resources: {
      description:
        'An object with the service resources (see resourceConfiguration schema)',
      type: 'object',
    },
  },
  required: ['basePath', 'name', 'info', 'resources'],
}
