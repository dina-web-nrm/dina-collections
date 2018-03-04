const JSON_API_HEADER = 'application/vnd.api+json'

module.exports = function validateContentType(headerString, body) {
  if (!headerString) {
    return null
  }

  if (
    headerString.indexOf(JSON_API_HEADER) !== -1 &&
    headerString !== JSON_API_HEADER
  ) {
    const error = new Error(
      `Provide correct json api content-type header got: ${headerString}`
    )
    error.status = 415
    return error
  }

  if (body && headerString !== JSON_API_HEADER) {
    const error = new Error(
      `Provide correct json api content-type header got: ${headerString}`
    )
    error.status = 415
    return error
  }

  return null
}
