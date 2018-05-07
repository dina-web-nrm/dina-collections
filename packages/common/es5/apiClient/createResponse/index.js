'use strict';

var validateOutput = require('./validateOutput');
var mapOutput = require('./mapOutput');

module.exports = function createResponse(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      responseData = _ref.responseData;

  return validateOutput({
    apiConfig: apiConfig,
    endpointConfig: endpointConfig,
    methodConfig: methodConfig,
    responseData: responseData
  }).then(function () {
    return mapOutput({
      apiConfig: apiConfig,
      endpointConfig: endpointConfig,
      methodConfig: methodConfig,
      responseData: responseData
    });
  });
};