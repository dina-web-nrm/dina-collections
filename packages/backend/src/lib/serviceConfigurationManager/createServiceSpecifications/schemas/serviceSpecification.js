module.exports = {
  additionalProperties: false,
  properties: {
    controllers: {
      type: 'object',
    },
    info: {
      type: 'object',
    },
    models: {
      oneOf: [
        {
          type: 'object',
        },
        { type: 'array' },
      ],
    },
    name: {
      type: 'string',
    },
    resourceOrder: {
      type: 'array',
    },
    resources: {
      type: 'object',
    },
  },
  required: ['name', 'info'],
}
