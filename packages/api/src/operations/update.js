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
    connector: connect ? connector : undefined,
    method: 'patch',
    modelName,
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
    summary: `Updates ${resource}`,
  }
}
