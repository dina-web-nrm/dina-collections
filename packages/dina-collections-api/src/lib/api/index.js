const express = require('express')
const createLog = require('../../utilities/log')
const createRoutes = require('./routeFactory')

const log = createLog('api')

const extractRouteHandlersFromModules = modules => {
  return Object.keys(modules).reduce((routeHandlers, moduleName) => {
    const { endpoints } = modules[moduleName]

    if (!endpoints) {
      return routeHandlers
    }

    return {
      ...routeHandlers,
      ...Object.keys(endpoints).reduce((obj, endpointName) => {
        return {
          ...obj,
          [endpointName]: endpoints[endpointName],
        }
      }, {}),
    }
  }, {})
}

module.exports = function createApi({
  config,
  controllers,
  keycloak,
  modules,
  openApiSpec,
}) {
  const routeHandlers = extractRouteHandlersFromModules(modules)
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
