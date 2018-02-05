const {
  authenticateMiddleware,
  createRequestMiddleware,
  errorMiddleware,
  operationMiddleware,
} = require('./middlewareFactories')

module.exports = function createRoute({
  apiConfig,
  controllers,
  endpointConfig,
}) {
  const middlewares = [
    createRequestMiddleware({
      apiConfig,
      endpointConfig,
    }),
    authenticateMiddleware({
      apiConfig,
      endpointConfig,
    }),
    operationMiddleware({
      apiConfig,
      controllers,
      endpointConfig,
    }),
    errorMiddleware({
      apiConfig,
      endpointConfig,
    }),
  ]

  return {
    middlewares,
    pathname: endpointConfig.pathname,
    verbName: endpointConfig.verbName,
  }
}
