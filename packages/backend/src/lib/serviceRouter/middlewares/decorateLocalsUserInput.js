const createLog = require('../../../utilities/log')

const log = createLog('decorateLocalsUserInputMiddleware')

module.exports = function createDecorateLocalsUserInputMiddleware() {
  return (req, res, next) => {
    const { body, headers, params: pathParams, query: queryParams } = req
    const userInput = {
      body,
      headers,
      pathParams,
      queryParams,
    }

    log.debug(
      `${res.locals.id}: Building request ${JSON.stringify({
        body,
        pathParams,
        queryParams,
      })}`
    )

    log.info(`${res.locals.id}: Building request `)

    res.locals.userInput = userInput
    next()
  }
}
