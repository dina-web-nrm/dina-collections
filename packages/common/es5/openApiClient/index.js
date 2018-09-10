'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../apiClient'),
    createApiClient = _require.createApiClient;

module.exports = function createOpenApiClient(_ref) {
  var apiConfigInput = _ref.apiConfigInput,
      createEndpoint = _ref.createEndpoint;

  var apiClient = createApiClient(apiConfigInput);
  var endpointConfigCache = {};
  var call = function call(input, userInput) {
    var endpointConfig = void 0;
    var operationId = void 0;
    if (typeof input === 'string') {
      operationId = input;
    } else {
      endpointConfig = input;
    }

    if (!endpointConfig) {
      if (endpointConfigCache[operationId]) {
        endpointConfig = endpointConfigCache[operationId];
      } else {
        endpointConfig = createEndpoint({ operationId: operationId });
        if (!endpointConfig) {
          throw new Error('Cant create endpoint config for operationId: ' + operationId);
        }
        endpointConfigCache[operationId] = endpointConfig;
      }
    }

    return apiClient.call(endpointConfig, userInput);
  };

  return (0, _extends3.default)({}, apiClient, {
    call: call
  });
};