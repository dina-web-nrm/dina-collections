module.exports = {
  additionalProperties: false,
  properties: {
    createHighlight: {
      not: {
        type: 'string',
      },
    },
    description: {
      type: 'string',
    },
    elasticsearch: {
      not: {
        type: 'string',
      },
    },
    extractItems: {
      not: {
        type: 'string',
      },
    },
    includeSource: {
      type: 'boolean',
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
