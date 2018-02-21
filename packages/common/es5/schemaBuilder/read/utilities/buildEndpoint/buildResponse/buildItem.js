'use strict';

module.exports = function buildItem(_ref) {
  var resource = _ref.resource,
      relationships = _ref.relationships;

  return {
    additionalProperties: false,
    properties: {
      attributes: {
        $ref: '__ROOT__' + resource
      },
      id: {
        example: '1234',
        type: 'string'
      },

      relationships: relationships,
      type: {
        default: resource,
        type: 'string'
      }
    },
    type: 'object'
  };
};