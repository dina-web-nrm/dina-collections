'use strict';

var buildRaw = require('./buildRaw');


module.exports = function createRequest(_ref) {
  var description = _ref.description,
      examples = _ref.examples,
      format = _ref.format,
      operationId = _ref.operationId,
      raw = _ref.raw,
      resource = _ref.resource;

  var name = operationId + 'Request';
  if (raw) {
    return buildRaw({
      name: name,
      raw: raw
    });
  }

  if (format === 'array') {
    return {
      name: name,
      examples: examples,
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
                    default: resource
                  },
                  id: {
                    type: 'string',
                    example: '1234'
                  },
                  attributes: {
                    $ref: '__ROOT__' + resource
                  }
                }
              }
            }
          }
        }
      }
    };
  }

  return {
    name: name,
    examples: examples,
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
                example: '1234'
              },
              type: {
                type: 'string',
                default: resource
              },
              attributes: {
                $ref: '__ROOT__' + resource
              }
            }
          }
        }
      }
    }
  };
};