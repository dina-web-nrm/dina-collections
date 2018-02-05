const createLog = require('../../../../utilities/log')
const createRequest = require('../../../../../utilities/apiClient/createRequest')

const log = createLog('createRequestMiddleware')

module.exports = function createRequestMiddleware({
  apiConfig,
  endpointConfig,
}) {
  return (req, res, next) => {
    const { body, headers, params: pathParams, query: queryParams } = req

    const input = {
      body,
      headers,
      pathParams,
      queryParams,
    }

    if (apiConfig.log.incomingRequest) {
      log.debug(
        `${res.locals.id}: Building request ${JSON.stringify({
          body,
          pathParams,
          queryParams,
        })}`
      )
    }

    Promise.resolve(
      createRequest({
        apiConfig,
        endpointConfig,
        methodConfig: {},
        userInput: input,
      })
    )
      .then(request => {
        res.locals.request = request
        next()
      })
      .catch(err => {
        next(err)
      })
  }
}
