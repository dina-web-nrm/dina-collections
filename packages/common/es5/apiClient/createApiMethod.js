'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intercept = require('./intercept');
var wrappedFetch = require('./fetch');
var handleError = require('./error');

var validateEndpointConfig = require('./validation/validateEndpointConfig');
var validateMethodConfig = require('./validation/validateMethodConfig');
var createResponse = require('./createResponse');
var createRequest = require('./createRequest');

module.exports = function createApiMethod(apiConfig, methodConfigInput) {
  var methodConfig = (0, _extends3.default)({
    requestContentType: 'json',
    responseContentType: 'json'
  }, methodConfigInput);

  validateMethodConfig(methodConfig, apiConfig);
  return function apiMethod(endpointConfig) {
    var userInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    validateEndpointConfig(endpointConfig, apiConfig);
    return createRequest({
      apiConfig: apiConfig,
      endpointConfig: endpointConfig,
      methodConfig: methodConfig,
      userInput: userInput
    }).then(function (request) {
      return intercept({
        apiConfig: apiConfig,
        endpointConfig: endpointConfig,
        methodConfig: methodConfig,
        request: request
      }).then(function (interceptResult) {
        if (interceptResult) {
          return interceptResult;
        }
        return wrappedFetch({
          apiConfig: apiConfig,
          endpointConfig: endpointConfig,
          methodConfig: methodConfig,
          request: request
        });
      }).then(function (responseData) {
        return createResponse({
          apiConfig: apiConfig,
          endpointConfig: endpointConfig,
          methodConfig: methodConfig,
          responseData: responseData
        });
      });
    }).catch(handleError);
  };
};