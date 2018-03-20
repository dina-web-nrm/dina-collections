'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intercept = require('./intercept');
var handleError = require('./error');

var validateEndpointConfig = require('./validation/validateEndpointConfig');
var validateMethodConfig = require('./validation/validateMethodConfig');
var createResponse = require('./createResponse');
var createRequest = require('./createRequest');

module.exports = function createRequestHandler(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      handler = _ref.handler,
      methodConfigInput = _ref.methodConfigInput;

  var methodConfig = (0, _extends3.default)({
    requestContentType: 'json',
    responseContentType: 'json'
  }, methodConfigInput);

  validateMethodConfig(methodConfigInput, apiConfig);
  validateEndpointConfig(endpointConfig, apiConfig);
  return function routeFunction(_ref2) {
    var user = _ref2.user,
        userInput = _ref2.userInput;

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
        if (!handler) {
          throw new Error('Not implemented');
        }
        return handler({
          request: request,
          user: user
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