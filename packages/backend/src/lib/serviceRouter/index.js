const express = require('express')
const createLog = require('../../utilities/log')
const errorMiddlewareFactory = require('./middlewares/error')
const authorizeMiddlewareFactory = require('./middlewares/authorize')
const decorateLocalsUserInputMiddlewareFactory = require('./middlewares/decorateLocalsUserInput')
const requestHandlerMiddlewareFactory = require('./middlewares/requestHandler')
const ensureMediaTypeMiddlewareFactory = require('./middlewares/ensureMediaType')
const expressifyPath = require('./utilities/expressifyPath')
const shouldMountOperation = require('./utilities/shouldMountOperation')

const log = createLog('lib/serviceRouter')

module.exports = function serviceRouterFactory({ auth, config, operations }) {
  log.info('creating service router')

  const scopedLog = log.scope()

  const decorateLocalsUserInputMiddleware = decorateLocalsUserInputMiddlewareFactory(
    {
      config,
    }
  )
  // scopedLog.info('adding decorate locals middleware')

  const serviceRouter = express.Router({ mergeParams: true })

  scopedLog.info('adding middleware: ensure media type')
  serviceRouter.use(ensureMediaTypeMiddlewareFactory())

  scopedLog.info('adding middleware: authorize')
  serviceRouter.use(
    authorizeMiddlewareFactory({ auth, config, log: scopedLog.scope() })
  )
  scopedLog.info('adding routes for all operations')
  Object.keys(operations).forEach(operationId => {
    const { controller, operationSpecification } = operations[operationId]
    const { serviceName, method, path } = operationSpecification
    const mountOperation = shouldMountOperation({
      config,
      operationId,
      serviceName,
    })
    if (mountOperation) {
      const requestHandlerMiddleware = requestHandlerMiddlewareFactory({
        config,
        controller,
        operationId,
      })

      const expressifiedPath = expressifyPath(path)
      serviceRouter[method](expressifiedPath, decorateLocalsUserInputMiddleware)
      serviceRouter[method](expressifiedPath, requestHandlerMiddleware)
    } else {
      scopedLog.info(`Not mounting operation: ${operationId}`)
    }
  })

  scopedLog.info('adding middleware: error ')
  serviceRouter.use(errorMiddlewareFactory({ config }))

  return serviceRouter
}
