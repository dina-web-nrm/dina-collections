const createEndpointConfigObject = require('dina-shared/src/utilities/apiClient/factories/createEndpointConfig')
const createBodyValidator = require('dina-shared/src/utilities/endpointFactory/createBodyValidator')
const createSystemModelSchemaValidator = require('dina-shared/src/utilities/jsonSchema/createSystemModelSchemaValidator')

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
