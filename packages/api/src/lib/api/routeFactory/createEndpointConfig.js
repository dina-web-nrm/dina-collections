const createEndpointConfigObject = require('common/src/apiClient/factories/createEndpointConfig')
const createBodyValidator = require('common/src/endpointFactory/createBodyValidator')
const createSystemModelSchemaValidator = require('common/src/jsonSchema/createSystemModelSchemaValidator')

module.exports = function createEndpointConfig({
  methodSpecification,
  operationId,
  pathname,
  routeHandler,
  routeMock,
  verbName,
}) {
  return createEndpointConfigObject(
    {
      handler: routeHandler,
      mock: routeMock,
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
}
