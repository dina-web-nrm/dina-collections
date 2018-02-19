'use strict';

var _require = require('../constants'),
    ERROR_CODES = _require.ERROR_CODES,
    ORIGINS = _require.ORIGINS,
    TYPES = _require.TYPES;

var createError = require('./base');

module.exports = function createSystemErrorFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      context = _ref.context;

  return function createSystemError(error) {
    var errorCode = error.errorCode && ERROR_CODES[error.errorCode] || ERROR_CODES.DEFAULT_SYSTEM;
    var meta = {
      context: context,
      errorCode: errorCode,
      origin: ORIGINS.CLIENT,
      status: null,
      type: TYPES.SYSTEM
    };
    return createError({
      error: error,
      meta: meta
    });
  };
};