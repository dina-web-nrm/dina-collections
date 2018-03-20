const express = require('express')
const createLog = require('../../utilities/log')
const errorMiddlewareFactory = require('./middlewares/error')
const authorizeMiddlewareFactory = require('./middlewares/authorize')
const decorateLocalsUserInputMiddlewareFactory = require('./middlewares/decorateLocalsUserInput')
const requestHandlerMiddlewareFactory = require('./middlewares/requestHandler')
const ensureMediaTypeMiddlewareFactory = require('./middlewares/ensureMediaType')
const expressifyPath = require('./utilities/expressifyPath')

const log = createLog('lib/serviceRouter')

module.exports = function serviceRouterFactory({ auth, config, connectors }) {
  const errorMiddleware = errorMiddlewareFactory({ config })
  const authorizeMiddleware = authorizeMiddlewareFactory({ auth, config })
  const decorateLocalsUserInputMiddleware = decorateLocalsUserInputMiddlewareFactory(
    {
      config,
    }
  )
  const ensureMediaTypeMiddleware = ensureMediaTypeMiddlewareFactory()

  const serviceRouter = express.Router({ mergeParams: true })

  serviceRouter.use(ensureMediaTypeMiddleware)
  serviceRouter.use(authorizeMiddleware)
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
    serviceRouter.use(expressifiedPath, decorateLocalsUserInputMiddleware)
    serviceRouter[method](expressifiedPath, requestHandlerMiddleware)
  })
  log.info('Mounting service done')

  serviceRouter.use(errorMiddleware)

  return serviceRouter
}
