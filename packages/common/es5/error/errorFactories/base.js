'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../constants'),
    ERROR_CODES = _require.ERROR_CODES;

var createErrorMessageFromError = function createErrorMessageFromError(error) {
  if (Array.isArray(error)) {
    return error[0].errorCode + ' - ' + error[0].fullPath + ' - ' + (error[0].originalError.params && (0, _stringify2.default)(error[0].originalError.params, null, 2) || '');
  }

  return '';
};

module.exports = function createError(_ref) {
  var meta = _ref.meta,
      error = _ref.error;
  var context = meta.context,
      errorCode = meta.errorCode,
      origin = meta.origin,
      status = meta.status,
      type = meta.type,
      _meta$userInteraction = meta.userInteraction,
      userInteraction = _meta$userInteraction === undefined ? false : _meta$userInteraction,
      _meta$verbose = meta.verbose,
      verbose = _meta$verbose === undefined ? false : _meta$verbose;


  var errorMessage = createErrorMessageFromError(error);

  var message = verbose ? 'ERROR - ' + errorCode + ', ' + origin + ', ' + type + ', ' + context + ', \n\n ' + (0, _stringify2.default)(error) : 'ERROR - ' + errorCode + ', ' + origin + ', ' + type + ', ' + context + ', ' + errorMessage;

  return {
    _known: true,
    context: context,
    error: error,
    errorCode: errorCode || ERROR_CODES.UNKNOWN,
    message: message,
    origin: origin,
    status: status,
    type: type,
    userInteraction: userInteraction
  };
};