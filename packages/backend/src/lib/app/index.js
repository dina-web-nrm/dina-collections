const express = require('express')
const bodyParser = require('body-parser')

const createAuthenticateMiddleware = require('../auth/middleware')
const createDocsMiddleware = require('./middlewares/docs')
const createErrorHandlerMiddleware = require('./middlewares/errorHandler')
const createLogFrontendErrorEndpointMiddleware = require('./middlewares/logFrontendErrorEndpoint')
const createLogIncomingMiddleware = require('./middlewares/logIncoming')
const createPingRouteMiddleware = require('./middlewares/pingRoute')
const createResponseTimeMiddleware = require('./middlewares/responseTime')

module.exports = function createApp(
  { auth, config, openApiSpec, routers } = {}
) {
  const app = express()

  const authenticateMiddleware = createAuthenticateMiddleware({ auth, config })
  const docsMiddleware = createDocsMiddleware({ openApiSpec })
  const errorHandlerMiddleware = createErrorHandlerMiddleware()
  const logFrontendErrorEndpointMiddleware = createLogFrontendErrorEndpointMiddleware(
    { config }
  )
  const logIncomingMiddleware = createLogIncomingMiddleware()
  const pingRouteMiddleware = createPingRouteMiddleware()
  const responseTimeMiddleware = createResponseTimeMiddleware()
  app.use(responseTimeMiddleware)
  app.use(logIncomingMiddleware)
  app.use('/docs', docsMiddleware)
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
  app.use(authenticateMiddleware)
  app.use(logFrontendErrorEndpointMiddleware)
  app.use(pingRouteMiddleware)

  if (routers) {
    app.use(routers)
  }
  app.use(errorHandlerMiddleware)

  return app
}
