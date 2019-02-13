'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createErrorId = require('../utilities/createErrorId');

var errorCodes = require('../constants/errorCodes');
var errorStatus = require('../constants/errorStatus');

module.exports = function backendError(_ref) {
  var inputCode = _ref.code,
      detailInput = _ref.detailInput,
      parameterErrors = _ref.parameterErrors,
      path = _ref.path,
      source = _ref.source,
      inputStatus = _ref.status,
      _ref$throwError = _ref.throwError,
      throwError = _ref$throwError === undefined ? true : _ref$throwError;

  var baseError = errorCodes[inputCode];
  if (!baseError) {
    baseError = errorCodes.INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE;
  }

  var _ref2 = errorStatus[inputStatus] || {},
      status = _ref2.status;

  if (!status) {
    baseError = errorCodes.INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE;
    status = 500;
  }
  var errorId = createErrorId();
  var detail = detailInput || errorId;

  var message = status + ', ' + baseError.code + ', ' + detail + ' ';

  var error = (0, _extends3.default)({}, baseError, {
    _dinaError: true,
    detail: detail,
    id: createErrorId(),
    message: message,
    parameterErrors: parameterErrors,
    path: path,
    source: source,
    stack: message,
    status: Number(status)
  });

  if (throwError) {
    throw error;
  }
  return error;
};