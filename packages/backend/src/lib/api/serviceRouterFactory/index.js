const express = require('express')
const createLog = require('../../../utilities/log')
const errorMiddlewareFactory = require('./middlewares/error')
const decorateLocalsUserInputMiddlewareFactory = require('./middlewares/decorateLocalsUserInput')
const requestHandlerMiddlewareFactory = require('./middlewares/requestHandler')
const expressifyPath = require('./utilities/expressifyPath')

const log = createLog('lib/api/serviceRouter')

module.exports = function serviceRouterFactory({ config, connectors }) {
  const serviceRouter = express.Router({ mergeParams: true })
  const errorMiddleware = errorMiddlewareFactory({ config })
  const decorateLocalsUserInput = decorateLocalsUserInputMiddlewareFactory({
    config,
  })

  log.info('Registering service routes')
  const scopedLog = log.scope()
  Object.keys(connectors).forEach(operationId => {
    const { method, path, requestHandler } = connectors[operationId]
    const requestHandlerMiddleware = requestHandlerMiddlewareFactory({
      config,
      operationId,
      requestHandler,
    })

    const expressifiedPath = expressifyPath(path)

    scopedLog.info(
      `${method.toUpperCase()} - ${expressifiedPath} as ${operationId}`
    )
    serviceRouter.use(expressifiedPath, decorateLocalsUserInput)
    serviceRouter[method](expressifiedPath, requestHandlerMiddleware)
  })
  log.info('Mounting service done')

  serviceRouter.use(errorMiddleware)

  return serviceRouter
}
