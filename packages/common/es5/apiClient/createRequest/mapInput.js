'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs');
var chainPromises = require('../../chainPromises');

module.exports = function mapInput(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      userInput = _ref.userInput;

  var configs = [apiConfig, endpointConfig, methodConfig];

  return _promise2.default.all([chainPromises(extractMethodsFromConfigs(configs, 'mapBody'), userInput.body || {}), chainPromises(extractMethodsFromConfigs(configs, 'mapHeaders'), userInput.headers || {}), chainPromises(extractMethodsFromConfigs(configs, 'mapPathParams'), userInput.pathParams || {}), chainPromises(extractMethodsFromConfigs(configs, 'mapQueryParams'), userInput.queryParams || {})]).then(function (_ref2) {
    var _ref3 = (0, _slicedToArray3.default)(_ref2, 4),
        body = _ref3[0],
        headers = _ref3[1],
        pathParams = _ref3[2],
        queryParams = _ref3[3];

    return {
      body: body,
      headers: headers,
      pathParams: pathParams,
      queryParams: queryParams
    };
  });
};