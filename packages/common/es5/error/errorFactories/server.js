'use strict';

var _require = require('../constants'),
    ERROR_CODES = _require.ERROR_CODES,
    ORIGINS = _require.ORIGINS,
    TYPES = _require.TYPES;

var createError = require('./base');

module.exports = function createApiErrorFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      context = _ref.context;

  return function createApiError(error) {
    var errorCode = error.errorCode && ERROR_CODES[error.errorCode] || ERROR_CODES.DEFAULT_API_ERROR;

    var statusFromContext = void 0;
    if (context === 'inputBodyValidation') {
      statusFromContext = 400;
    }

    var meta = {
      context: context,
      errorCode: errorCode,
      origin: ORIGINS.SERVER,
      status: error.status || statusFromContext || null,
      type: TYPES.API
    };
    return createError({
      error: error,
      meta: meta
    });
  };
};