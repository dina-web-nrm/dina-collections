module.exports = {
  additionalProperties: false,
  properties: {
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
  required: ['name', 'info', 'resources'],
}
