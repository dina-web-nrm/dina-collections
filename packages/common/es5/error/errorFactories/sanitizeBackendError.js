'use strict';

var backendError500 = require('./backendError500');
var isDinaError = require('../utilities/isDinaError');

module.exports = function sanitizeBackendError(_ref) {
  var errorInput = _ref.error,
      log = _ref.log;

  var error = errorInput;
  if (!isDinaError(error)) {
    if (log) {
      log.err('Unknown error', error);
    }
    error = backendError500({
      source: 'sanitizeBackendError'
    });
  }

  var _error = error,
      code = _error.code,
      description = _error.description,
      detail = _error.detail,
      id = _error.id,
      message = _error.message,
      parameterErrors = _error.parameterErrors,
      source = _error.source,
      status = _error.status,
      title = _error.title;


  return {
    code: code,
    description: description,
    detail: detail,
    id: id,
    message: message,
    parameterErrors: parameterErrors,
    source: source,
    status: status,
    title: title
  };
};