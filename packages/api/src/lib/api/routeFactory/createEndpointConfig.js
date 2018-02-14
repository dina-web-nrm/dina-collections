const createMockFunction = require('common/src/endpointFactory/createMockFunction')
const commonCreateEndpointConfig = require('common/src/endpointFactory/server')

module.exports = function createEndpointConfig({
  apiConfig,
  methodSpecification,
  operationId,
  routeHandler,
  verbName,
}) {
  let handler = routeHandler
  let usingMock = false
  if (apiConfig.mock.active) {
    if (apiConfig.mock.preferred || !handler) {
      handler = createMockFunction({
        methodSpecification,
      })
      usingMock = true
    }
  }
  const endpointConfig = commonCreateEndpointConfig({
    handler,
    operationId,
  })

  return {
    ...endpointConfig,
    usingMock,
    verbName,
  }
}
