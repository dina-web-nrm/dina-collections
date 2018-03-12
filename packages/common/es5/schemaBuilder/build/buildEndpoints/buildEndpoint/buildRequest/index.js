'use strict';

var buildRelationships = require('../buildResponse/buildRelationships');
var buildRaw = require('./buildRaw');


module.exports = function createRequest(_ref) {
  var description = _ref.description,
      examples = _ref.examples,
      format = _ref.format,
      modelReference = _ref.modelReference,
      operationId = _ref.operationId,
      raw = _ref.raw,
      relations = _ref.relations,
      resource = _ref.resource;

  var relationships = buildRelationships({
    relations: relations
  });

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
                    default: resource,
                    enum: [resource],
                    type: 'string'
                  },
                  id: {
                    type: 'string',
                    example: '1234'
                  },
                  attributes: modelReference ? undefined : {
                    $ref: '__ROOT__' + resource
                  },
                  relationships: relationships
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
                default: resource,
                enum: [resource],
                type: 'string'
              },
              attributes: modelReference ? undefined : {
                $ref: '__ROOT__' + resource
              },
              relationships: relationships
            }
          }
        }
      }
    }
  };
};