const intercept = require('./intercept')
const handleError = require('./error')

const validateMethodConfig = require('./factories/validateMethodConfig')
const createResponse = require('./createResponse')
const createRequest = require('./createRequest')

module.exports = function createRouteFunction({
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

  return function routeFunction({ controllers, userInput, user }) {
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
            return handler({
              controllers,
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
