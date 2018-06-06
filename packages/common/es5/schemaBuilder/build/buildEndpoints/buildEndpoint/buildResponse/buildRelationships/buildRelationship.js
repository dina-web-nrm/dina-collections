'use strict';

module.exports = function buildRelationship() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$format = _ref.format,
      relationFormat = _ref$format === undefined ? 'object' : _ref$format,
      key = _ref.key,
      link = _ref.link,
      resourceInput = _ref.targetResource;

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
      additionalProperties: false,
      properties: {
        data: {
          oneOf: [existingResourceData, {
            type: 'null'
          }]
        },
        links: links
      },
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