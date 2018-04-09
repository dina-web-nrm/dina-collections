'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapInput = require('./mapInput');
var validateInput = require('./validateInput');

var allowedInputKeys = ['body', 'headers', 'pathParams', 'queryParams'];

module.exports = function createRequest(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      userInput = _ref.userInput;

  (0, _keys2.default)(userInput).forEach(function (key) {
    if (!allowedInputKeys.includes(key)) {
      throw new Error('userInput contains unexpected key: ' + key);
    }
  });

  return mapInput({
    apiConfig: apiConfig,
    endpointConfig: endpointConfig,
    methodConfig: methodConfig,
    userInput: userInput
  }).then(function (_ref2) {
    var body = _ref2.body,
        headers = _ref2.headers,
        pathParams = _ref2.pathParams,
        queryParams = _ref2.queryParams;

    var request = {
      body: body,
      headers: headers,
      pathParams: pathParams,
      queryParams: queryParams
    };

    return validateInput({
      apiConfig: apiConfig,
      endpointConfig: endpointConfig,
      methodConfig: methodConfig,
      request: request
    }).then(function () {
      return request;
    });
  });
};