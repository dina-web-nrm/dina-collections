const createRouteFunction = require('common/src/apiClient/createRouteFunction')
const createLog = require('../../../../utilities/log')

const log = createLog('operationMiddleware')

module.exports = function createOperationMiddleware({
  apiConfig,
  controllers,
  endpointConfig,
  method,
  models,
}) {
  const { handler } = endpointConfig
  if (!handler) {
    return (req, res, next) => {
      log.info(`${res.locals.id}: No routehandler or mock. skipping request`)
      return next()
    }
  }

  const routeFunction = createRouteFunction({
    apiConfig,
    endpointConfig,
    handler,
    methodConfigInput: {
      method,
    },
  })

  return (req, res, next) => {
    const { locals: { userInput, user } } = res
    log.info(
      `${res.locals.id}: Call route function for ${endpointConfig.operationId}`
    )

    return routeFunction({
      controllers,
      models,
      user,
      userInput,
    })
      .then(data => {
        log.info(`${res.locals.id}: Sending route function result`)

        if (apiConfig.log.outgoingResponse) {
          log.debug(
            `${res.locals.id}: Sending response ${JSON.stringify(data)}`
          )
        }

        res.send(data)
      })
      .catch(err => {
        next(err)
      })
  }
}
