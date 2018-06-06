'use strict';

module.exports = function buildItem(_ref) {
  var modelReference = _ref.modelReference,
      relationships = _ref.relationships,
      resource = _ref.resource;

  return {
    additionalProperties: false,
    properties: {
      attributes: modelReference ? undefined : {
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