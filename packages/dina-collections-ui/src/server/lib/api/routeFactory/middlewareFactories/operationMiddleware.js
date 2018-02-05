const createLog = require('../../../../utilities/log')
const createResponse = require('../../../../../utilities/apiClient/createResponse')

const log = createLog('operationMiddleware')

module.exports = function createOperationMiddleware({
  apiConfig,
  controllers,
  endpointConfig,
}) {
  const { mock, handler } = endpointConfig

  const useMock =
    apiConfig.mock.active && (!handler || apiConfig.mock.preferred)

  const routeFn = useMock ? mock : handler

  if (!routeFn) {
    return (req, res, next) => {
      log.info(`${res.locals.id}: No routehandler or mock. skipping request`)
      return next()
    }
  }

  return (req, res, next) => {
    const { locals: { request, user } } = res
    log.info(`${res.locals.id}: Call route function`)

    Promise.resolve(routeFn({ controllers, request, user }))
      .then(({ data: operationData, headers: operationHeaders }) => {
        return createResponse({
          apiConfig: {},
          endpointConfig,
          methodConfig: {},
          responseData: operationData,
          responseHeaders: operationHeaders,
        }).then(data => {
          log.info(`${res.locals.id}: Sending route function result`)

          if (apiConfig.log.outgoingResponse) {
            log.debug(
              `${res.locals.id}: Sending response ${JSON.stringify(data)}`
            )
          }

          res.send(data)
        })
      })
      .catch(err => {
        next(err)
      })
  }
}
