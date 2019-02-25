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
    const {
      locals: { userInput, user },
    } = res
    log.info(`${res.locals.id}: Call route function for ${operationId}`)
    return requestHandler({
      requestId: res.locals.id,
      user,
      userInput,
    })
      .then(result => {
        log.info(`${res.locals.id}: Sending route function result`)
        if (config.log.outgoingResponse) {
          log.debug(
            `${res.locals.id}: Sending response 200 ${JSON.stringify(result)}`
          )
        } else {
          log.debug(`${res.locals.id}: Sending response 200`)
        }
        if (
          result &&
          result.meta &&
          result.meta.internals &&
          result.meta.internals.status
        ) {
          res.status(result.meta.internals.status)
        }

        if (
          result &&
          result.meta &&
          result.meta.isFile &&
          result.meta.filePath
        ) {
          return res.sendFile(result.meta.filePath, {}, err => {
            if (err) {
              next(err)
            }
          })
        }
        res.set('Content-Type', 'application/vnd.api+json')
        return res.send(result)
      })
      .catch(err => {
        next(err)
      })
  }
}
