const buildResponses = require('./buildResponses')
const buildParameters = require('./buildParameters')
const buildRequest = require('./buildRequest')

module.exports = function buildPath(endpoint) {
  const {
    description,
    errors,
    headers,
    inverseOperationId,
    operationId,
    pathParams,
    queryParams,
    request,
    response,
    security,
    summary,
    tags,
  } = endpoint

  const responses = buildResponses({ errors, operationId, response })
  const requestBody = buildRequest({ operationId, request })
  const parameters = buildParameters({
    headers,
    pathParams,
    queryParams,
  })

  const pathSpec = {
    description,
    operationId,
    parameters,
    requestBody,
    responses,
    security,
    summary,
    tags,
  }

  if (inverseOperationId) {
    pathSpec['x-inverseOperationId'] = inverseOperationId
  }

  return pathSpec
}
