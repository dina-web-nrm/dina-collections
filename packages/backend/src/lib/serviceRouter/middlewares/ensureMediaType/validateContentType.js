const backendError = require('common/src/error/errorFactories/backendError')

const JSON_API_HEADER = 'application/vnd.api+json'

module.exports = function validateContentType(headerString, body) {
  if (!headerString) {
    return null
  }

  if (
    headerString.indexOf(JSON_API_HEADER) !== -1 &&
    headerString !== JSON_API_HEADER
  ) {
    return backendError({
      code: 'REQUEST_ERROR',
      detail: `Provide correct json api content-type header got: ${
        headerString
      }`,
      status: 415,
      throwError: false,
    })
  }

  if (body && headerString !== JSON_API_HEADER) {
    return backendError({
      code: 'REQUEST_ERROR',
      detail: `Provide correct json api content-type header got: ${
        headerString
      }`,
      status: 415,
      throwError: false,
    })
  }

  return null
}
