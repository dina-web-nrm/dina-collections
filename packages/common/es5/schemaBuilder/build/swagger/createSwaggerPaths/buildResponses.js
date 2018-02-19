'use strict';

var interpolate = require('../../utilities/interpolate');

module.exports = function buildResponses(_ref) {
  var operationId = _ref.operationId,
      response = _ref.response;

  if (!response) {
    throw new Error('Provide response for ' + operationId);
  }
  var responses = {
    200: {
      description: 'successful operation',
      schema: {
        $ref: '__ROOT__' + response.name
      }
    }
  };
  return interpolate(responses, '__ROOT__', '#/definitions/');
};