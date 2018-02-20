const createConnector = require('../connectors/create')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function create({
  basePath,
  connect,
  connector = createConnector,
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
    routeHandler: connect ? connector({ modelName }) : undefined,
    summary: `Create an ${resource}`,
  }
}
