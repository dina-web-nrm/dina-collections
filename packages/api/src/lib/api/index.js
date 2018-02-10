const express = require('express')
const createLog = require('../../utilities/log')
const createRoutes = require('./routeFactory')

const log = createLog('api')

const extractRouteHandlersFromApis = apis => {
  return Object.keys(apis).reduce((routeHandlers, apiName) => {
    const { endpoints } = apis[apiName]

    if (!endpoints) {
      return routeHandlers
    }

    return {
      ...routeHandlers,
      ...Object.keys(endpoints).reduce((obj, endpointName) => {
        return {
          ...obj,
          [endpointName]: endpoints[endpointName].routeHandler,
        }
      }, {}),
    }
  }, {})
}

module.exports = function createApi({
  config,
  controllers,
  keycloak,
  apis,
  openApiSpec,
}) {
  const routeHandlers = extractRouteHandlersFromApis(apis)
  const routeMocks = {}
  const apiConfig = { controllers, ...config.api, log: config.log }

  const routes = createRoutes({
    apiConfig,
    apiSpecification: openApiSpec,
    config,
    controllers,
    routeHandlers,
    routeMocks,
  })

  const api = express.Router() //eslint-disable-line

  if (config.auth.active) {
    api.use(keycloak.protect())
  }

  routes.forEach(({ middlewares, pathname, verbName }) => {
    log.info(`Register route: ${verbName.toUpperCase()} - ${pathname}`)
    api[verbName](pathname, middlewares)
  })

  return api
}
