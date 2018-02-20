const {
  authenticateMiddleware,
  createRequestMiddleware,
  errorMiddleware,
  operationMiddleware,
} = require('./middlewareFactories')

module.exports = function createRoute({
  apiConfig,
  endpointConfig,
  method,
  models,
  pathname,
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
      endpointConfig,
      method,
      models,
    }),
    errorMiddleware({
      apiConfig,
      endpointConfig,
    }),
  ]

  return {
    middlewares,
    operationId: endpointConfig.operationId,
    pathname,
    verbName: endpointConfig.verbName,
  }
}
