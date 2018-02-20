const updateConnector = require('../../connectors/update')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function updateOperation({
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
    routeHandler: connect ? updateConnector({ modelName }) : undefined,
    summary: `Updates ${resource}`,
  }
}
