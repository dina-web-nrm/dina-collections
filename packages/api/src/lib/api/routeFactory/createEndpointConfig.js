const createEndpointConfigObject = require('common/src/apiClient/factories/createEndpointConfig')
const createBodyValidator = require('common/src/endpointFactory/createBodyValidator')
const createMockFunction = require('common/src/endpointFactory/createMockFunction')
const createSystemModelSchemaValidator = require('common/src/jsonSchema/createSystemModelSchemaValidator')

module.exports = function createEndpointConfig({
  apiConfig,
  methodSpecification,
  operationId,
  pathname,
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

  const endpointConfig = createEndpointConfigObject(
    {
      handler,
      operationId,
      pathname,
      validateBody: createBodyValidator({
        createSystemModelSchemaValidator,
        methodSpecification,
      }),
      verbName,
    },
    {}
  )

  return {
    ...endpointConfig,
    usingMock,
  }
}
