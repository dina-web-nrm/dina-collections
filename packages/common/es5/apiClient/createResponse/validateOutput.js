'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chainPromises = require('../../chainPromises');
var extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs');

module.exports = function validate(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      responseData = _ref.responseData;
  var validateOutput = apiConfig.validateOutput;


  var configs = [apiConfig, endpointConfig, methodConfig];

  return !validateOutput ? _promise2.default.resolve() : _promise2.default.all([chainPromises(extractMethodsFromConfigs(configs, 'validateResponse'), responseData)]);
};