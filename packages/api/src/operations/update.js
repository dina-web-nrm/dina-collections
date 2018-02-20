const updateConnector = require('../connectors/update')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function update({
  basePath,
  connect,
  connector = updateConnector,
  modelName,
  resource,
  resourcePlural,
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
    routeHandler: connect ? connector({ modelName }) : undefined,
    summary: `Updates ${resource}`,
  }
}
