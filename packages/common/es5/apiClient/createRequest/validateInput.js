'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs');
var chainPromises = require('../../chainPromises');

module.exports = function validate(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      request = _ref.request;
  var validateInput = apiConfig.validateInput;


  if (!validateInput) {
    return _promise2.default.resolve(request);
  }
  var configs = [apiConfig, endpointConfig, methodConfig];
  return _promise2.default.all([chainPromises(extractMethodsFromConfigs(configs, 'validateBody'), request.body), chainPromises(extractMethodsFromConfigs(configs, 'validateHeaders'), request.headers), chainPromises(extractMethodsFromConfigs(configs, 'validatePathParams'), request.pathParams), chainPromises(extractMethodsFromConfigs(configs, 'validateQueryParams'), request.queryParams)]).then(function () {
    return request;
  });
};