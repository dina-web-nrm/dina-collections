const createLog = require('../../../utilities/log')

const log = createLog('requestHandlerMiddleware')

module.exports = function createRequestHandlerMiddleware({
  config,
  operationId,
  requestHandler,
}) {
  if (!requestHandler) {
    return (req, res, next) => {
      log.info(`${res.locals.id}: No routehandler or mock. skipping request`)
      return next()
    }
  }

  return (req, res, next) => {
    const { locals: { userInput, user } } = res
    log.info(`${res.locals.id}: Call route function for ${operationId}`)
    return requestHandler({
      user,
      userInput,
    })
      .then(data => {
        log.info(`${res.locals.id}: Sending route function result`)

        if (config.log.outgoingResponse) {
          log.debug(
            `${res.locals.id}: Sending response 200 ${JSON.stringify(data)}`
          )
        } else {
          log.debug(`${res.locals.id}: Sending response 200`)
        }
        res.set('Content-Type', 'application/vnd.api+json')
        res.send(data)
      })
      .catch(err => {
        next(err)
      })
  }
}
