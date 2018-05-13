module.exports = {
  additionalProperties: false,
  properties: {
    resources: {
      patternProperties: {
        '^[a-zA-Z]+$': {
          additionalProperties: false,
          properties: {
            customSelectors: {
              items: {
                additionalProperties: true,
                properties: {
                  type: {
                    type: 'string',
                  },
                },
                required: ['type'],
                type: 'object',
              },
              type: 'array',
            },
            operations: {
              items: {
                additionalProperties: false,
                properties: {
                  operationId: {
                    type: 'string',
                  },
                  options: {
                    type: 'object',
                  },
                  type: {
                    type: 'string',
                  },
                },
                required: ['operationId', 'type'],
                type: 'object',
              },
              type: 'array',
            },
          },
          type: 'object',
        },
      },
      type: 'object',
    },
  },
}
