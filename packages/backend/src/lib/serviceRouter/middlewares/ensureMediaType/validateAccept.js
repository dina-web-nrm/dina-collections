const backendError = require('common/src/error/errorFactories/backendError')

const JSON_API_HEADER = 'application/vnd.api+json'

module.exports = function validateAccept(headerString) {
  if (!headerString) {
    return null
  }
  const headerArray = headerString.split(',')

  let containsModifiedJsonApiHeader = false
  let containsCorrectJsonApiHeader = false

  for (let i = 0; i < headerArray.length; i += 1) {
    const header = headerArray[i].trim()
    if (header.indexOf(JSON_API_HEADER) !== -1) {
      containsModifiedJsonApiHeader = true
    }
    if (header === JSON_API_HEADER) {
      containsCorrectJsonApiHeader = true
    }
  }
  if (containsModifiedJsonApiHeader && !containsCorrectJsonApiHeader) {
    return backendError({
      code: 'REQUEST_ERROR',
      detail: `Provide correct json api accept header got: ${headerString}`,
      status: 406,
      throwError: false,
    })
  }

  return null
}
