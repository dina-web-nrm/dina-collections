const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const createErrorHandlerMiddleware = require('./middlewares/errorHandler')
const createLogIncomingMiddleware = require('./middlewares/logIncoming')
const createDocsMiddleware = require('./middlewares/docs')
const createPingRouteMiddleware = require('./middlewares/pingRoute')
const createKeycloakMiddleware = require('./middlewares/keycloak')

module.exports = function createApp(
  { config, openApiSpec, servicesRouter } = {}
) {
  const app = express()

  const docsMiddleware = createDocsMiddleware({ openApiSpec })
  const logIncomingMiddleware = createLogIncomingMiddleware()
  const errorHandlerMiddleware = createErrorHandlerMiddleware()
  const pingRouteMiddleware = createPingRouteMiddleware()
  const keycloakMiddleware = createKeycloakMiddleware({ config })

  app.use(responseTime())
  app.use(logIncomingMiddleware)
  app.use('/docs', docsMiddleware)
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())
  app.use(keycloakMiddleware)

  app.use(pingRouteMiddleware)

  if (servicesRouter) {
    app.use(servicesRouter)
  }
  app.use(errorHandlerMiddleware)

  return app
}
