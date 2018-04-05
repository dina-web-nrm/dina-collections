module.exports = {
  additionalProperties: false,
  properties: {
    controllers: {
      type: 'object',
    },
    elasticModels: {
      oneOf: [
        {
          type: 'object',
        },
        { type: 'array' },
      ],
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
    resources: {
      type: 'object',
    },
  },
  required: ['name', 'info'],
}
