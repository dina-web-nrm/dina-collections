const schemaInterface = require('../schemaInterface')
const createBodyValidator = require('./utilities/createBodyValidator')
const createGetExample = require('./utilities/createGetExample')
const createMock = require('./utilities/createMock')
const createQueryParamValidator = require('./utilities/createQueryParamValidator')
const createResponseValidator = require('./utilities/createResponseValidator')
const createMapQueryParams = require('./utilities/createMapQueryParams')

module.exports = function createEndpointFactory({
  createApiClientValidator,
  importFaker,
}) {
  return function createEndpoint({ operationId, ...rest }) {
    const openApiSpec = schemaInterface.getOpenApiSpec()

    const {
      methodName,
      methodSpecification,
      pathname,
    } = schemaInterface.getMethodByOperationId(operationId)
    return {
      getExample: createGetExample({
        methodSpecification,
        openApiSpec,
      }),
      mapQueryParams: createMapQueryParams({ methodSpecification }),
      methodName,
      mock: createMock({
        importFaker,
        methodSpecification,
      }),

      operationId,
      pathname,
      validateBody: createBodyValidator({
        createApiClientValidator,
        methodSpecification,
      }),
      validateQueryParams: createQueryParamValidator({
        createApiClientValidator,
        methodSpecification,
      }),
      validateResponse: createResponseValidator({
        createApiClientValidator,
        methodSpecification,
      }),
      ...rest,
    }
  }
}
