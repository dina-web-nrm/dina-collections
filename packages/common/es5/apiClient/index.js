'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateApiConfig = require('./validation/validateApiConfig');
var createApiMethod = require('./createApiMethod');

module.exports = function createApiClient(apiConfigInput) {
  var apiConfig = (0, _extends3.default)({
    validateInput: true,
    validateOutput: true
  }, apiConfigInput);

  validateApiConfig(apiConfig);

  var formPost = createApiMethod(apiConfig, {
    mapHeaders: function mapHeaders(userInputHeaders) {
      return (0, _extends3.default)({}, userInputHeaders, {
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    },
    method: 'POST'
  });

  var httpDelete = createApiMethod(apiConfig, {
    method: 'delete'
  });

  var httpGet = createApiMethod(apiConfig, {
    method: 'GET'
  });

  var httpPatch = createApiMethod(apiConfig, {
    mapHeaders: function mapHeaders(userInputHeaders) {
      return (0, _extends3.default)({}, userInputHeaders, {
        'Content-Type': 'application/json'
      });
    },
    method: 'PATCH'
  });

  var httpPost = createApiMethod(apiConfig, {
    mapHeaders: function mapHeaders(userInputHeaders) {
      return (0, _extends3.default)({}, userInputHeaders, {
        'Content-Type': 'application/json'
      });
    },
    method: 'POST'
  });

  var httpPut = createApiMethod(apiConfig, {
    mapHeaders: function mapHeaders(userInputHeaders) {
      return (0, _extends3.default)({}, userInputHeaders, {
        'Content-Type': 'application/json'
      });
    },
    method: 'PUT'
  });

  var methods = {
    formPost: formPost,
    httpDelete: httpDelete,
    httpGet: httpGet,
    httpPatch: httpPatch,
    httpPost: httpPost,
    httpPut: httpPut
  };

  var call = function call(endpointConfigInput) {
    var userInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var methodName = endpointConfigInput.methodName;

    if (!methodName) {
      throw new new Error('methodName is required when using call')();
    }
    switch (methodName) {
      case 'formPost':
        {
          return formPost(endpointConfigInput, userInput);
        }
      case 'delete':
        {
          return httpDelete(endpointConfigInput, userInput);
        }
      case 'get':
        {
          return httpGet(endpointConfigInput, userInput);
        }
      case 'patch':
        {
          return httpPatch(endpointConfigInput, userInput);
        }
      case 'post':
        {
          return httpPost(endpointConfigInput, userInput);
        }
      case 'put':
        {
          return httpPut(endpointConfigInput, userInput);
        }
      default:
        {
          throw new Error(methodName + ' is not supperted in call');
        }
    }
  };
  return (0, _extends3.default)({}, methods, {
    call: call
  });
};