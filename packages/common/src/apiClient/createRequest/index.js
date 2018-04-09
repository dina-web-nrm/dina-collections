const mapInput = require('./mapInput')
const validateInput = require('./validateInput')

const allowedInputKeys = ['body', 'headers', 'pathParams', 'queryParams']

module.exports = function createRequest({
  apiConfig,
  endpointConfig,
  methodConfig,
  userInput,
}) {
  Object.keys(userInput).forEach(key => {
    if (!allowedInputKeys.includes(key)) {
      throw new Error(`userInput contains unexpected key: ${key}`)
    }
  })

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
