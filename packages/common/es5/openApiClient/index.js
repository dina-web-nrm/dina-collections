'use strict';

var _require = require('../apiClient'),
    createApiClient = _require.createApiClient;

var createOperationId = require('./createOperationId');

module.exports = function createJsonApiClient(_ref) {
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

  var typeCall = function typeCall(resourceType, operationType, userInput) {
    var operationId = createOperationId(resourceType, operationType);
    return call(operationId, userInput);
  };

  return {
    call: call,
    typeCall: typeCall
  };
};