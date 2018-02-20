const createMockFunction = require('common/es5/endpointFactory/createMockFunction')
const commonCreateEndpointConfig = require('common/es5/endpointFactory/server')

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
