const getByIdConnector = require('../../connectors/getById')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function createOperation({
  basePath,
  connect,
  modelName,
  relations,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}`

  return {
    method: 'get',
    operationId,
    path: `${basePath}/${resourcePlural}/{id}`,
    pathParams: ['id'],
    resource,
    response: {
      format: 'object',
      relations: buildRelations({
        basePath,
        relations,
        resourcePlural,
      }),
    },
    routeHandler: connect ? getByIdConnector({ modelName }) : undefined,
    summary: `Find ${resource} by id`,
  }
}
