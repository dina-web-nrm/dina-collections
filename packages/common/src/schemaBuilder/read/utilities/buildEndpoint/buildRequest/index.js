const buildRaw = require('./buildRaw')
/* eslint-disable sort-keys */

module.exports = function createRequest({
  description,
  examples,
  format,
  operationId,
  raw,
  resource,
}) {
  const name = `${operationId}Request`
  if (raw) {
    return buildRaw({
      name,
      raw,
    })
  }

  if (format === 'array') {
    return {
      name,
      examples,
      schema: {
        description: description || 'this is a desc',
        body: {
          additionalProperties: false,
          type: 'object',
          required: ['data'],
          properties: {
            data: {
              type: 'array',
              additionalProperties: false,
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    default: resource,
                  },
                  id: {
                    type: 'string',
                    example: '1234',
                  },
                  attributes: {
                    $ref: `__ROOT__${resource}`,
                  },
                },
              },
            },
          },
        },
      },
    }
  }

  return {
    name,
    examples,
    schema: {
      description: description || 'this is a desc for request',
      body: {
        additionalProperties: false,
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            additionalProperties: false,
            properties: {
              id: {
                type: 'string',
                example: '1234',
              },
              type: {
                type: 'string',
                default: resource,
              },
              attributes: {
                $ref: `__ROOT__${resource}`,
              },
            },
          },
        },
      },
    },
  }
}
