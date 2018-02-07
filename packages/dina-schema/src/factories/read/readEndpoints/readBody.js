const readParameterFromJsonFile = require('../utilities/readParameterFromJsonFile')

module.exports = function readBody({ endpointName, endpointPath }) {
  const schema = readParameterFromJsonFile({
    basePath: endpointPath,
    parameterName: 'request',
  })

  if (!schema) {
    return null
  }

  const name = `${endpointName}Request`

  return {
    name,
    schema,
  }
}
