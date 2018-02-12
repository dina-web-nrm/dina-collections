const createLog = require('../../../utilities/log')
const createEndpointConfig = require('./createEndpointConfig')
const createRoute = require('./createRoute')

const log = createLog('routeFactory')

const flattenPaths = paths => {
  return Object.keys(paths).reduce((flatPaths, pathname) => {
    const pathSpecification = paths[pathname]
    const methods = Object.keys(pathSpecification)
    return [
      ...flatPaths,
      ...methods.map(method => {
        const methodSpecification = pathSpecification[method]
        return {
          method,
          methodSpecification,
          operationId: methodSpecification.operationId,
          // TODO fix this hack
          pathname: pathname.replace('{id}', ':id'),
        }
      }),
    ]
  }, [])
}

module.exports = function createRoutes({
  apiConfig,
  apiSpecification,
  controllers,
  routeHandlers,
  routeMocks,
}) {
  const { paths } = apiSpecification

  const array = flattenPaths(paths)
  return array
    .map(({ method, methodSpecification, operationId, pathname }) => {
      const routeHandler = routeHandlers[operationId]
      const routeMock = routeMocks[operationId]
      const endpointConfig = createEndpointConfig({
        apiConfig,
        apiSpecification,
        methodSpecification,
        operationId,
        pathname,
        routeHandler,
        routeMock,
        verbName: method,
      })

      if (!endpointConfig.handler) {
        log.debug(`Skip route: ${method.toUpperCase()} - ${pathname}`)
        return null
      }
      const route = createRoute({
        apiConfig,
        controllers,
        endpointConfig,
      })

      return {
        ...route,
        usingMock: endpointConfig.usingMock,
      }
    })
    .filter(route => !!route)
}
