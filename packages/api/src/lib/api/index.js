const express = require('express')
const createLog = require('../../utilities/log')
const createRoutes = require('./routeFactory')
const createRouteHandlers = require('./createRouteHandlers')

const log = createLog('lib/api')

module.exports = function createApi({
  apis,
  config,
  keycloak,
  models,
  openApiSpec,
}) {
  const routeHandlers = createRouteHandlers({
    apis,
    models,
  })
  const routeMocks = {}
  const apiConfig = { ...config.api, log: config.log }

  const routes = createRoutes({
    apiConfig,
    apiSpecification: openApiSpec,
    config,
    models,
    routeHandlers,
    routeMocks,
  })

  const api = express.Router() //eslint-disable-line

  if (config.auth.active) {
    api.use(keycloak.protect())
  }
  routes.forEach(
    ({ middlewares, operationId, pathname, verbName, usingMock }) => {
      if (usingMock) {
        log.info(
          `Register mock: ${verbName.toUpperCase()} - ${pathname} as ${
            operationId
          }`
        )
      } else {
        log.info(
          `Register route: ${verbName.toUpperCase()} - ${pathname} as ${
            operationId
          }`
        )
      }

      api[verbName](pathname, middlewares)
    }
  )

  return api
}
