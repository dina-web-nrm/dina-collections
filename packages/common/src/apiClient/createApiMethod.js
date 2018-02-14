const intercept = require('./intercept')
const wrappedFetch = require('./fetch')
const handleError = require('./error')

const validateEndpointConfig = require('./validation/validateEndpointConfig')
const validateMethodConfig = require('./validation/validateMethodConfig')
const createResponse = require('./createResponse')
const createRequest = require('./createRequest')

module.exports = function createApiMethod(apiConfig, methodConfigInput) {
  const methodConfig = {
    requestContentType: 'json',
    responseContentType: 'json',
    ...methodConfigInput,
  }
  validateMethodConfig(methodConfigInput, apiConfig)

  return function apiMethod(endpointConfig, userInput = {}) {
    validateEndpointConfig(endpointConfig, apiConfig)
    return createRequest({
      apiConfig,
      endpointConfig,
      methodConfig,
      userInput,
    })
      .then(request => {
        return intercept({
          apiConfig,
          endpointConfig,
          methodConfig,
          request,
        })
          .then(interceptResult => {
            if (interceptResult) {
              return interceptResult
            }
            return wrappedFetch({
              apiConfig,
              endpointConfig,
              methodConfig,
              request,
            })
          })
          .then(responseData => {
            return createResponse({
              apiConfig,
              endpointConfig,
              methodConfig,
              responseData,
            })
          })
      })
      .catch(handleError)
  }
}
