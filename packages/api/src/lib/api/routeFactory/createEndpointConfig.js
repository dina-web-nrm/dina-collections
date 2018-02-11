const createEndpointConfigObject = require('common/src/utilities/apiClient/factories/createEndpointConfig')
const createBodyValidator = require('common/src/utilities/endpointFactory/createBodyValidator')
const createSystemModelSchemaValidator = require('common/src/utilities/jsonSchema/createSystemModelSchemaValidator')

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
