'use strict';

var interpolate = require('../../utilities/interpolate');

module.exports = function buildResponses(_ref) {
  var operationId = _ref.operationId,
      response = _ref.response;

  if (!response) {
    throw new Error('Provide response for ' + operationId);
  }
  var description = response.description,
      name = response.name;

  var responses = {
    200: {
      content: {
        'application/vnd.api+json': {
          schema: {
            $ref: '__ROOT__' + name
          }
        }
      },
      description: description || 'successful operation'
    }
  };
  return interpolate(responses, '__ROOT__', '#/components/schemas/');
};