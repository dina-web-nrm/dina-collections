'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chainPromises = require('../../chainPromises');
var extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs');

module.exports = function mapOutput(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      responseData = _ref.responseData;

  var configs = [apiConfig, endpointConfig, methodConfig];

  return _promise2.default.all([chainPromises(extractMethodsFromConfigs(configs, 'mapResponse'), responseData || {})]).then(function (_ref2) {
    var _ref3 = (0, _slicedToArray3.default)(_ref2, 1),
        response = _ref3[0];

    return response;
  });
};