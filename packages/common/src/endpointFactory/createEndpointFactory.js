const buildOperationIdPathnameMap = require('./utilities/buildOperationIdPathnameMap')
const createBodyValidator = require('./utilities/createBodyValidator')
const createGetExample = require('./utilities/createGetExample')
const createMock = require('./utilities/createMock')
const createQueryParamValidator = require('./utilities/createQueryParamValidator')
const createResponseValidator = require('./utilities/createResponseValidator')
const createMapQueryParams = require('./utilities/createMapQueryParams')
const openApiSpec = require('../../dist/openApi.json')

const map = buildOperationIdPathnameMap(openApiSpec)

module.exports = function createEndpointFactory({
  createApiClientValidator,
  importFaker,
  origin,
}) {
  return function createEndpoint({ operationId, ...rest }) {
    if (!map[operationId]) {
      throw new Error(`Operation id: ${operationId} unknown`) // eslint-disable-line no-console
    }

    const { methodName, methodSpecification, pathname } = map[operationId]
    return {
      getExample: createGetExample({
        methodSpecification,
        openApiSpec,
      }),
      mapQueryParams:
        origin === 'server' && createMapQueryParams({ methodSpecification }),
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
      validateQueryParams:
        origin === 'server' &&
        createQueryParamValidator({
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
