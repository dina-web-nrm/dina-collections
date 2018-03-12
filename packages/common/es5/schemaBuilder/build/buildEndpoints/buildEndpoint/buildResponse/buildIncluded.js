'use strict';

module.exports = function buildIncluded(include) {
  if (!include || include.length === 0) {
    return undefined;
  }
  var included = {
    example: include.map(function (_ref) {
      var resource = _ref.resource;

      return {
        attributes: {},
        id: '1234',
        type: resource
      };
    }),
    items: {
      oneOf: include.map(function (_ref2) {
        var resource = _ref2.resource;

        return {
          properties: {
            attributes: {
              $ref: '__ROOT__' + resource
            },
            id: { type: 'string' },
            type: {
              default: resource,
              example: resource,
              type: 'string'
            }
          },
          type: 'object'
        };
      })
    },
    type: 'array'
  };
  return included;
};