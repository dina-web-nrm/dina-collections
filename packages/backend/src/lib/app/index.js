const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const createErrorHandlerMiddleware = require('./middlewares/errorHandler')
const createLogIncomingMiddleware = require('./middlewares/logIncoming')
const createDocsMiddleware = require('./middlewares/docs')
const createPingRouteMiddleware = require('./middlewares/pingRoute')
const createAuthenticateMiddleware = require('./middlewares/authenticate')

module.exports = function createApp(
  { auth, config, openApiSpec, routers } = {}
) {
  const app = express()

  const docsMiddleware = createDocsMiddleware({ openApiSpec })
  const logIncomingMiddleware = createLogIncomingMiddleware()
  const errorHandlerMiddleware = createErrorHandlerMiddleware()
  const pingRouteMiddleware = createPingRouteMiddleware()
  const authenticateMiddleware = createAuthenticateMiddleware({ auth, config })

  app.use(responseTime())
  app.use(logIncomingMiddleware)
  app.use('/docs', docsMiddleware)
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(
    bodyParser.json({
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
