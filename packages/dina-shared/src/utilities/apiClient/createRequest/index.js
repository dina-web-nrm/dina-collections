const mapInput = require('./mapInput')
const validateInput = require('./validateInput')

module.exports = function createRequest({
  apiConfig,
  endpointConfig,
  methodConfig,
  userInput,
}) {
  return mapInput({
    apiConfig,
    endpointConfig,
    methodConfig,
    userInput,
  }).then(({ body, headers, pathParams, queryParams }) => {
    const request = {
      body,
      headers,
      pathParams,
      queryParams,
    }

    return validateInput({
      apiConfig,
      endpointConfig,
      methodConfig,
      request,
    }).then(() => {
      return request
    })
  })
}
