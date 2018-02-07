const readResponse = require('./readResponse')
const readBody = require('./readBody')
const readParameterFromMarkdownFile = require('../utilities/readParameterFromMarkdownFile')
const readParameterFromJsonFile = require('../utilities/readParameterFromJsonFile')

module.exports = function readEndpoint({
  endpointName,
  endpointPath,
  serverName,
}) {
  const endpoint = require(endpointPath)
  const tags = endpoint.tags ? [...endpoint.tags, serverName] : [serverName]

  const description = readParameterFromMarkdownFile(endpointPath, 'description')
  const summary = readParameterFromMarkdownFile(endpointPath, 'summary')

  const response = readResponse({ endpointName, endpointPath })

  const pathParams = readParameterFromJsonFile({
    basePath: endpointPath,
    parameterName: 'pathParams',
  })
  const queryParams = readParameterFromJsonFile({
    basePath: endpointPath,
    parameterName: 'queryParams',
  })

  const headers = readParameterFromJsonFile({
    basePath: endpointPath,
    parameterName: 'headers',
  })

  const request = readBody({ endpointName, endpointPath })

  return {
    ...endpoint,
    description: description || endpoint.description,
    headers: headers || endpoint.headers,
    operationId: endpointName,
    pathParams: pathParams || endpoint.pathParams,
    queryParams: queryParams || endpoint.queryParams,
    request: request || endpoint.request,
    response: response || endpoint.response,
    summary: summary || endpoint.summary,
    tags,
  }
}
