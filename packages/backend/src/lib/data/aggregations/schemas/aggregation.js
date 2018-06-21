module.exports = {
  additionalProperties: false,
  properties: {
    description: {
      type: 'string',
    },
    elasticsearch: {
      not: {
        type: 'string',
      },
    },
    inputSchema: {
      type: 'object',
    },
    key: {
      type: 'string',
    },

    resource: {
      type: 'string',
    },
  },
  required: ['description', 'key'],
}
