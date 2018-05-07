'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiConfigSchema = require('../schemas/apiConfigSchema');

module.exports = function validateApiConfig() {
  var apiConfigInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var apiConfig = (0, _extends3.default)({
    validateInput: true,
    validateOutput: true
  }, apiConfigInput);

  var systemValidate = apiConfig.systemValidate;

  var error = systemValidate && systemValidate(apiConfig, apiConfigSchema);
  if (error) {
    throw error;
  }
};