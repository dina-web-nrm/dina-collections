'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolate = require('../../utilities/interpolate');

module.exports = function buildResponses(_ref) {
  var operationId = _ref.operationId,
      response = _ref.response;

  if (!response) {
    throw new Error('Provide response for ' + operationId);
  }
  var description = response.description,
      name = response.name,
      _response$status = response.status,
      status = _response$status === undefined ? 200 : _response$status;

  var responses = (0, _defineProperty3.default)({}, status, {
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: '__ROOT__' + name
        }
      }
    },
    description: description || 'successful operation'
  });
  return interpolate(responses, '__ROOT__', '#/components/schemas/');
};