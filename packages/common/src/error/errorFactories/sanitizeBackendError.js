const backendError500 = require('./backendError500')
const isDinaError = require('../utilities/isDinaError')

module.exports = function sanitizeBackendError({ error: errorInput, log }) {
  let error = errorInput
  if (!isDinaError(error)) {
    if (log) {
      log.err('Unknown error', error)
    }
    error = backendError500({
      source: 'sanitizeBackendError',
    })
  }

  const {
    code,
    description,
    detail,
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
    message,
    parameterErrors,
    source,
    status,
    title,
  }
}
