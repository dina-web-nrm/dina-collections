const createLog = require('../../../utilities/log')
const createEndpointConfig = require('./createEndpointConfig')
const createRoute = require('./createRoute')
const flattenPaths = require('../utilities/flattenPaths')

const log = createLog('routeFactory')

module.exports = function createRoutes({
  apiConfig,
  apiSpecification,
  models,
  routeHandlers,
}) {
  const { paths } = apiSpecification

  const array = flattenPaths(paths)
  return array
    .map(({ method, methodSpecification, operationId, pathname }) => {
      const routeHandler = routeHandlers[operationId]
      const endpointConfig = createEndpointConfig({
        apiConfig,
        methodSpecification,
        operationId,
        routeHandler,
        verbName: method,
      })

      if (!endpointConfig.handler) {
        log.debug(`Skip route: ${method.toUpperCase()} - ${pathname}`)
        return null
      }
      const route = createRoute({
        apiConfig,
        endpointConfig,
        method,
        models,
        pathname,
      })

      return {
        ...route,
        usingMock: endpointConfig.usingMock,
      }
    })
    .filter(route => !!route)
}
