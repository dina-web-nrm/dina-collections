'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorCodes = require('../constants/errorCodes');
var errorStatus = require('../constants/errorStatus');

module.exports = function frontendError(_ref) {
  var inputCode = _ref.code,
      detail = _ref.detail,
      parameterErrors = _ref.parameterErrors,
      path = _ref.path,
      inputStatus = _ref.status,
      _ref$throwError = _ref.throwError,
      throwError = _ref$throwError === undefined ? true : _ref$throwError;

  var _ref2 = new Error('frontendError'),
      stack = _ref2.stack;

  var baseError = errorCodes[inputCode];
  if (!baseError) {
    baseError = errorCodes.INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE;
  }

  var _ref3 = errorStatus[inputStatus] || {},
      status = _ref3.status;

  var error = (0, _extends3.default)({}, baseError, {
    _dinaError: true,
    detail: detail,
    parameterErrors: parameterErrors,
    path: path,
    stack: stack,
    status: Number(status)
  });

  if (throwError) {
    throw error;
  }
  return error;
};