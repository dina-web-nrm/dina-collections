const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const createErrorHandler = require('./errorHandler')
const logIncomingRequest = require('./logIncomingRequest')
const createDocs = require('../docs')

module.exports = function createApp({ api, keycloak, openApiSpec }) {
  const app = express()
  app.use('/docs', createDocs({ openApiSpec }))
  app.use(responseTime())
  app.use(logIncomingRequest)
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())
  app.use(keycloak.middleware())

  app.get('/ping', (req, res) => {
    return res.send('pong')
  })

  app.use(api)
  app.use(createErrorHandler())

  return app
}
