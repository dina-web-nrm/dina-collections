module.exports = {
  item: {
    additionalProperties: false,
    properties: {
      attributes: {
        type: 'object',
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
    type: 'object',
  },
}
