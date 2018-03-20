"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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
    var endpointMock = endpointConfig.mock,
        getExample = endpointConfig.getExample;
    var _request$queryParams = request.queryParams,
        mockRequested = _request$queryParams.mock,
        requestedExampleId = _request$queryParams.exampleId;

    if (mockRequested === true && endpointMock) {
      if (requestedExampleId && getExample) {
        return getExample(requestedExampleId).then(function (example) {
          if (!example) {
            var error = new Error("Example with key: " + requestedExampleId + " not found");
            error.status = 404;
            throw error;
          }
          return example;
        });
      }
      return endpointMock({
        apiConfig: apiConfig,
        endpointConfig: endpointConfig,
        methodConfig: methodConfig,
        request: request
      }).then(function (mockData) {
        if (!mockData.data) {
          return mockData;
        }

        if (Array.isArray(mockData.data)) {
          var items = mockData.data.map(function (item) {
            if (item.attributes && item.attributes.id) {
              delete item.attributes.id;
            }
            return item;
          });
          return (0, _extends3.default)({}, mockData, {
            data: items
          });
        }
        if (mockData.data && mockData.data.attributes && mockData.data.attributes.id) {
          delete mockData.data.attributes.id;
        }
        return mockData;
      });
    }

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