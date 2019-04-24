module.exports = {
  additionalProperties: false,
  properties: {
    controllers: {
      description: 'Custom controllers used by operations in the service',
      type: 'object',
    },
    info: {
      properties: {
        description: {
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
    name: {
      type: 'string',
    },
    resourceOrder: {
      type: 'array',
    },
    resources: {
      description:
        'An object with the service resources (see resourceConfiguration schema)',
      type: 'object',
    },
  },
  required: ['name', 'info', 'resources'],
}
