const createEndpointConfigObject = require('../../../../utilities/apiClient/factories/createEndpointConfig')
const createBodyValidator = require('../../../../utilities/endpointFactory/createBodyValidator')
const createSystemModelSchemaValidator = require('../../../utilities/createSystemModelSchemaValidator')

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
