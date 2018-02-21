const createConnector = require('../connectors/create')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function create({
  basePath,
  connect,
  connector = createConnector,
  connectorOptions,
  exampleRequests = {},
  exampleResponses = {},
  modelName,
  queryParams,
  resource,
  resourcePlural,
}) {
  const operationId = `create${capitalizeFirstLetter(resource)}`
  return {
    connector: connect ? connector : undefined,
    connectorOptions,
    method: 'post',
    modelName,
    operationId,
    operationType: 'create',
    path: `${basePath}/${resourcePlural}`,
    queryParams,
    request: {
      examples: exampleRequests,
      format: 'object',
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
    },
    summary: `Create an ${resource}`,
  }
}
