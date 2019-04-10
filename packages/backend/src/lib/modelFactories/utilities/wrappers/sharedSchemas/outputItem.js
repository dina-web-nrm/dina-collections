module.exports = {
  oneOf: [
    {
      additionalProperties: false,
      properties: {
        attributes: {
          type: 'object',
        },
        diff: {
          type: 'array',
        },
        id: {
          type: 'string',
        },
        internals: {
          type: 'object',
        },
        relationships: {
          type: 'object',
        },
      },
      required: ['id', 'internals'],
      type: 'object',
    },
    { type: 'null' },
  ],
}
