module.exports = {
  additionalProperties: false,
  properties: {
    resources: {
      patternProperties: {
        '^[a-zA-Z]+$': {
          additionalProperties: false,
          properties: {
            operations: {
              items: {
                additionalProperties: false,
                properties: {
                  operationId: {
                    type: 'string',
                  },
                  type: {
                    type: 'string',
                  },
                },
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
