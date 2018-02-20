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
    connector: connect ? connector : undefined,
    method: 'post',
    modelName,
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
    summary: `Create an ${resource}`,
  }
}
