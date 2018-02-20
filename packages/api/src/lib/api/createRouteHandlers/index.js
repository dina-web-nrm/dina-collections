const createLog = require('../../../utilities/log')

const log = createLog('lib/api/createRouteHandlers')

module.exports = function createRouteHandlers({ apis, models }) {
  log.info('Create route handlers started')
  const createdRouteHandlers = Object.keys(apis).reduce(
    (routeHandlers, apiName) => {
      const { endpoints } = apis[apiName]

      if (!endpoints) {
        return routeHandlers
      }

      return {
        ...routeHandlers,
        ...Object.keys(endpoints).reduce((obj, operationId) => {
          const endpoint = endpoints[operationId]
          if (endpoint.connector) {
            log.info(`Create route handler for: ${operationId}`)
            const routeHandler = endpoint.connector({
              ...endpoint,
              models,
            })
            return {
              ...obj,
              [operationId]: routeHandler,
            }
          }
          return obj
        }, {}),
      }
    },
    {}
  )
  log.info('Create route handlers done')
  return createdRouteHandlers
}
