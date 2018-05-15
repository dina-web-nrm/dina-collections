const buildRelationships = require('../buildResponse/buildRelationships')
const buildRaw = require('./buildRaw')
/* eslint-disable sort-keys */

module.exports = function createRequest({
  description,
  examples,
  format,
  modelReference,
  operationId,
  raw,
  relations,
  resource,
}) {
  const relationships = buildRelationships({
    relations,
  })

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
                    default: resource,
                    enum: [resource],
                    type: 'string',
                  },
                  id: {
                    type: 'string',
                    example: '1234',
                  },
                  attributes: modelReference
                    ? undefined
                    : {
                        $ref: `__ROOT__${resource}`,
                      },
                  relationships,
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
            oneOf: [
              {
                type: 'null',
              },
              {
                type: 'object',
                additionalProperties: false,
                properties: {
                  id: {
                    type: 'string',
                    example: '1234',
                  },
                  type: {
                    default: resource,
                    enum: [resource],
                    type: 'string',
                  },
                  attributes: modelReference
                    ? undefined
                    : {
                        $ref: `__ROOT__${resource}`,
                      },
                  relationships,
                },
              },
            ],
          },
        },
      },
    },
  }
}
