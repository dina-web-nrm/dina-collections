'use strict';

var interpolate = require('../../utilities/interpolate');

module.exports = function buildRequest(_ref) {
  var request = _ref.request;

  if (!request) {
    return undefined;
  }
  var requestBody = {
    content: {
      'application/json': {
        schema: {
          $ref: '__ROOT__' + request.name
        }
      }
    },
    description: 'successful operation'
  };
  return interpolate(requestBody, '__ROOT__', '#/components/schemas/');
};