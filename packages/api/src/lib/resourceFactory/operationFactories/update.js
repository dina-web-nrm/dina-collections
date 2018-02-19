const createConnector = require('../../connectors/create')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function createOperation({
  basePath,
  resourcePlural,
  resource,
  modelName,
  connect,
}) {
  const operationId = `update${capitalizeFirstLetter(resource)}`

  return {
    method: 'patch',
    operationId,
    path: `${basePath}/${resourcePlural}/{id}`,
    pathParams: ['id'],
    request: {
      format: 'object',
    },
    resource,
    response: {
      format: 'object',
    },
    routeHandler: connect ? createConnector({ modelName }) : undefined,
    summary: `Updates ${resource}`,
  }
}
