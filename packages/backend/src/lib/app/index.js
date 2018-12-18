const express = require('express')
const bodyParser = require('body-parser')
const createErrorHandlerMiddleware = require('./middlewares/errorHandler')
const createLogIncomingMiddleware = require('./middlewares/logIncoming')
const createDocsMiddleware = require('./middlewares/docs')
const createPingRouteMiddleware = require('./middlewares/pingRoute')
const createAuthenticateMiddleware = require('../auth/middleware')
const createResponseTimeMiddleware = require('./middlewares/responseTime')

module.exports = function createApp(
  { auth, config, openApiSpec, routers } = {}
) {
  const app = express()

  const docsMiddleware = createDocsMiddleware({ openApiSpec })
  const logIncomingMiddleware = createLogIncomingMiddleware()
  const errorHandlerMiddleware = createErrorHandlerMiddleware()
  const pingRouteMiddleware = createPingRouteMiddleware()
  const authenticateMiddleware = createAuthenticateMiddleware({ auth, config })
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

  app.use(pingRouteMiddleware)

  if (routers) {
    app.use(routers)
  }
  app.use(errorHandlerMiddleware)

  return app
}
