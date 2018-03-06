'use strict';

module.exports = function buildRelationships(_ref) {
  var _ref$format = _ref.format,
      relationFormat = _ref$format === undefined ? 'object' : _ref$format,
      key = _ref.key,
      link = _ref.link,
      resourceInput = _ref.resource;

  var resource = resourceInput || key;
  var existingResourceData = {
    additionalProperties: false,
    properties: {
      id: {
        example: '1234',
        type: 'string'
      },
      type: {
        enum: [resource],
        example: resource,
        type: 'string'
      }
    },
    type: 'object'
  };

  var links = !link ? undefined : {
    properties: {
      self: {
        example: 'https://domain' + link,
        type: 'string',
        'x-faker': 'internet.url'
      }
    },
    type: 'object'
  };

  if (relationFormat === 'object') {
    return {
      oneOf: [{
        additionalProperties: false,
        properties: {
          data: existingResourceData,
          links: links
        },
        type: 'object'
      }, {
        additionalProperties: false,
        properties: {
          data: {
            type: 'null'
          },
          links: links
        },
        type: 'object'
      }],
      type: 'object'
    };
  }
  return {
    additionalProperties: false,
    properties: {
      data: {
        items: existingResourceData,
        type: 'array'
      },
      links: links
    },
    type: 'object'
  };
};