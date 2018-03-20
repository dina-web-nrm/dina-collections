const intercept = require('./intercept')
const handleError = require('./error')

const validateEndpointConfig = require('./validation/validateEndpointConfig')
const validateMethodConfig = require('./validation/validateMethodConfig')
const createResponse = require('./createResponse')
const createRequest = require('./createRequest')

module.exports = function createRequestHandler({
  apiConfig,
  endpointConfig,
  handler,
  methodConfigInput,
}) {
  const methodConfig = {
    requestContentType: 'json',
    responseContentType: 'json',
    ...methodConfigInput,
  }

  validateMethodConfig(methodConfigInput, apiConfig)
  validateEndpointConfig(endpointConfig, apiConfig)
  return function routeFunction({ user, userInput }) {
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
            if (!handler) {
              throw new Error('Not implemented')
            }
            return handler({
              request,
              user,
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
