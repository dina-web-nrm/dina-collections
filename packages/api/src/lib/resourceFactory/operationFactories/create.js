const createConnector = require('../../connectors/create')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function createOperation({
  basePath,
  connect,
  exampleResponses = [],
  modelName,
  resource,
  resourcePlural,
}) {
  const operationId = `create${capitalizeFirstLetter(resource)}`

  return {
    method: 'post',
    operationId,
    path: `${basePath}/${resourcePlural}`,
    request: {
      format: 'object',
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
    },
    routeHandler: connect ? createConnector({ modelName }) : undefined,
    summary: `Create an ${resource}`,
  }
}
