const readParameterFromJsonFile = require('../utilities/readParameterFromJsonFile')

module.exports = function readResponse({ endpointName, endpointPath }) {
  const schema = readParameterFromJsonFile({
    basePath: endpointPath,
    parameterName: 'response',
  })

  if (!schema) {
    return null
  }
  const name = `${endpointName}Response`

  return {
    name,
    schema,
  }
}
