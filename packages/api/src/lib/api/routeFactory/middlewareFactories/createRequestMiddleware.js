const createLog = require('../../../../utilities/log')

const log = createLog('createRequestMiddleware')

module.exports = function createRequestMiddleware({ apiConfig }) {
  return (req, res, next) => {
    const { body, headers, params: pathParams, query: queryParams } = req

    const userInput = {
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
    res.locals.userInput = userInput
    next()
  }
}
