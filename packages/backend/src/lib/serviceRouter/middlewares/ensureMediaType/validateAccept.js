const JSON_API_HEADER = 'application/vnd.api+json'

module.exports = function validateAccept(headerString) {
  if (!headerString) {
    const error = new Error('Provide accept header')
    error.status = 400
    return error
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
    const error = new Error(
      `Provide correct json api accept header got: ${headerString}`
    )
    error.status = 406
    return error
  }

  return null
}
