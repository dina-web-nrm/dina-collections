'use strict';

module.exports = function buildItem(_ref) {
  var modelReferens = _ref.modelReferens,
      relationships = _ref.relationships,
      resource = _ref.resource;

  return {
    additionalProperties: false,
    properties: {
      attributes: modelReferens ? undefined : {
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