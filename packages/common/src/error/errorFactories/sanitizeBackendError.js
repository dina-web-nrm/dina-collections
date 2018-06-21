const backendError500 = require('./backendError500')
const isDinaError = require('../utilities/isDinaError')

module.exports = function sanitizeBackendError({
  error: errorInput,
  isDevelopment,
  log,
}) {
  let error = errorInput
  if (!isDinaError(error)) {
    if (log) {
      log.err('Unknown error', error)
    }
    error = backendError500({
      detail: isDevelopment ? error.message : 'Not mapped',
      source: 'sanitizeBackendError',
      throwError: false,
    })
  }

  const {
    code,
    description,
    detail,
    id,
    message,
    parameterErrors,
    source,
    status,
    title,
  } = error

  return {
    code,
    description,
    detail,
    id,
    message,
    parameterErrors,
    source,
    status,
    title,
  }
}
