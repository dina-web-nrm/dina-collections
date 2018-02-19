"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function intercept(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      request = _ref.request;

  return _promise2.default.resolve().then(function () {
    var cache = apiConfig.cache,
        enableEndpointMocks = apiConfig.enableEndpointMocks;
    var endpointMock = endpointConfig.mock;


    if (enableEndpointMocks && endpointMock) {
      return _promise2.default.resolve(endpointMock({
        apiConfig: apiConfig,
        endpointConfig: endpointConfig,
        methodConfig: methodConfig,
        request: request
      })).then(function (mockResult) {
        return mockResult;
      });
    }

    if (cache) {
      return null;
    }

    return null;
  });
};