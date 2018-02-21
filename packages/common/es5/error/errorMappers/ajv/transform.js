'use strict';

var _require = require('../../constants'),
    JSON_SCHEMA_ERROR_CODES = _require.JSON_SCHEMA_ERROR_CODES;

module.exports = function transform(error) {
  var keyword = error.keyword;

  var errorCode = JSON_SCHEMA_ERROR_CODES[keyword];
  if (!keyword || !errorCode) {
    console.error('Missing errorCode for keyword ' + keyword);
  }

  return {
    errorCode: errorCode || keyword,
    fullPath: error.fullPath,
    originalError: error.originalError,
    params: error.params
  };
};