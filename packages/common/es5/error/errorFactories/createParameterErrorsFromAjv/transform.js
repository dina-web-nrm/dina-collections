'use strict';

var parameterErrorCodes = require('../../constants/parameterErrorCodes');

module.exports = function transform(error) {
  var keyword = error.keyword;

  var errorCode = parameterErrorCodes[keyword];
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