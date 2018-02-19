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
      controllers,
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
    pathname,
    verbName: endpointConfig.verbName,
  }
}
