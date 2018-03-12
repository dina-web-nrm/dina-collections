const buildOperationIdPathnameMap = require('./utilities/buildOperationIdPathnameMap')
const getBodyValidator = require('./utilities/getBodyValidator')
const getResponseValidator = require('./utilities/getResponseValidator')
const createGetExample = require('./utilities/createGetExample')
const createMockData = require('./utilities/createMockData')
const openApiSpec = require('../../dist/openApi.json')

const map = buildOperationIdPathnameMap(openApiSpec)

module.exports = function createEndpointFactory({
  createApiClientValidator,
  importFaker,
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
      methodName,
      mock: createMockData({
        importFaker,
        methodSpecification,
      }),

      operationId,
      pathname,
      validateBody: getBodyValidator({
        createApiClientValidator,
        methodSpecification,
      }),
      validateResponse: getResponseValidator({
        createApiClientValidator,
        methodSpecification,
      }),
      ...rest,
    }
  }
}
