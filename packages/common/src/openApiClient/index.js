const { createApiClient } = require('../apiClient')

module.exports = function createOpenApiClient({
  apiConfigInput,
  createEndpoint,
}) {
  const apiClient = createApiClient(apiConfigInput)
  const endpointConfigCache = {}
  const call = (input, userInput) => {
    let endpointConfig
    let operationId
    if (typeof input === 'string') {
      operationId = input
    } else {
      endpointConfig = input
    }

    if (!endpointConfig) {
      if (endpointConfigCache[operationId]) {
        endpointConfig = endpointConfigCache[operationId]
      } else {
        endpointConfig = createEndpoint({ operationId })
        if (!endpointConfig) {
          throw new Error(
            `Cant create endpoint config for operationId: ${operationId}`
          )
        }
        endpointConfigCache[operationId] = endpointConfig
      }
    }

    return apiClient.call(endpointConfig, userInput)
  }

  return {
    ...apiClient,
    call,
  }
}
