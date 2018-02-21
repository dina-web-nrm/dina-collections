'use strict';

var mapInput = require('./mapInput');
var validateInput = require('./validateInput');

module.exports = function createRequest(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      userInput = _ref.userInput;

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