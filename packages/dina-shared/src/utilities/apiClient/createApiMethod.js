const intercept = require('./intercept')
const wrappedFetch = require('./fetch')
const handleError = require('./error')

const createEndpointConfig = require('./factories/createEndpointConfig')
const createMethodConfig = require('./factories/createMethodConfig')
const createResponse = require('./createResponse')
const createRequest = require('./createRequest')

module.exports = function createApiMethod(apiConfig, methodConfigInput) {
  const methodConfig = createMethodConfig(methodConfigInput, apiConfig)

  return function apiMethod(endpointConfigInput, userInput = {}) {
    const endpointConfig = createEndpointConfig(endpointConfigInput, apiConfig)

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
