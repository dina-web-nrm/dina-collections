const express = require('express')
const bodyParser = require('body-parser')

const createLog = require('../../utilities/log')
const { middleware: createAuthenticateMiddleware } = require('../auth')
const createDocsMiddleware = require('./middlewares/docs')
const createRedocMiddleware = require('./middlewares/redoc')
const createErrorHandlerMiddleware = require('./middlewares/errorHandler')
const createLogFrontendErrorEndpointMiddleware = require('./middlewares/logFrontendErrorEndpoint')
const createLogIncomingMiddleware = require('./middlewares/logIncoming')
const createPingRouteMiddleware = require('./middlewares/pingRoute')
const createResponseTimeMiddleware = require('./middlewares/responseTime')

const log = createLog('lib/app')

module.exports = function createApp({
  auth,
  config,
  integrations,
  openApiSpec,
  routers,
} = {}) {
  log.info('creating app')
  const app = express()
  const scopedLog = log.scope()

  scopedLog.info('adding middleware: responseTime')
  app.use(createResponseTimeMiddleware())
  scopedLog.info('adding middleware: logIncoming')
  app.use(createLogIncomingMiddleware())
  scopedLog.info('adding middleware: docs')
  app.use('/docs', createDocsMiddleware({ openApiSpec }))
  app.use('/redoc', createRedocMiddleware({ openApiSpec }))

  scopedLog.info('adding middleware: body parser')
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
    })
  )
  app.use(
    bodyParser.json({
      limit: '50mb',
      type: ['application/vnd.api+json', 'application/json'],
    })
  )
  scopedLog.info('adding middleware: authenticate')
  app.use(createAuthenticateMiddleware({ auth, config, log: scopedLog }))
  scopedLog.info('adding middleware: log frontend error')
  app.use(createLogFrontendErrorEndpointMiddleware({ config, integrations }))
  scopedLog.info('adding middleware: ping route')
  app.use(createPingRouteMiddleware())

  if (routers) {
    scopedLog.info('adding service router')
    app.use(routers)
  }
  scopedLog.info('adding middleware: error handler')
  app.use(createErrorHandlerMiddleware())

  return app
}
