const getByIdConnector = require('../connectors/getById')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getOne({
  basePath,
  connect,
  connector = getByIdConnector,
  modelName,
  relations: relationsInput,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}`
  const relations = buildRelations({
    basePath,
    relations: relationsInput,
    resourcePlural,
  })

  return {
    method: 'get',
    operationId,
    path: `${basePath}/${resourcePlural}/{id}`,
    pathParams: ['id'],
    resource,
    response: {
      format: 'object',
      relations,
    },
    routeHandler: connect ? connector({ modelName, relations }) : undefined,
    summary: `Find ${resource} by id`,
  }
}
