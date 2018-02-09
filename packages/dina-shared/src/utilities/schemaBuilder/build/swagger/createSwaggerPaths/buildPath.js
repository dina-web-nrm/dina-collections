const buildResponses = require('./buildResponses')
const buildParameters = require('./buildParameters')

module.exports = function buildPath(endpoint) {
  const {
    description,
    headers,
    operationId,
    pathParams,
    queryParams,
    request,
    response,
    summary,
    tags,
  } = endpoint
  const responses = buildResponses({ operationId, response })
  const parameters = buildParameters({
    headers,
    pathParams,
    queryParams,
    request,
  })

  return {
    description,
    operationId,
    parameters,
    responses,
    summary,
    tags,
  }
}
