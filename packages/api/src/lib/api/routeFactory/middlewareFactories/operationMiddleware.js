const createRouteFunction = require('common/es5/apiClient/createRouteFunction')
const createLog = require('../../../../utilities/log')

const log = createLog('operationMiddleware')

module.exports = function createOperationMiddleware({
  apiConfig,
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
      models,
      user,
      userInput,
    })
      .then(data => {
        log.info(`${res.locals.id}: Sending route function result`)

        if (apiConfig.log.outgoingResponse) {
          log.debug(
            `${res.locals.id}: Sending response 200 ${JSON.stringify(data)}`
          )
        } else {
          log.debug(`${res.locals.id}: Sending response 200`)
        }

        res.send(data)
      })
      .catch(err => {
        next(err)
      })
  }
}
