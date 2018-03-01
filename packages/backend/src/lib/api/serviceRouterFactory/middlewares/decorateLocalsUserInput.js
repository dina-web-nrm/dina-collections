const createLog = require('../../../../utilities/log')

const log = createLog('createRequestMiddleware')

module.exports = function createRequestMiddleware({ config }) {
  return (req, res, next) => {
    const { body, headers, params: pathParams, query: queryParams } = req
    const userInput = {
      body,
      headers,
      pathParams,
      queryParams,
    }

    if (config.log.incomingRequest) {
      log.debug(
        `${res.locals.id}: Building request ${JSON.stringify({
          body,
          pathParams,
          queryParams,
        })}`
      )
    } else {
      log.debug(`${res.locals.id}: Building request `)
    }

    res.locals.userInput = userInput
    next()
  }
}
