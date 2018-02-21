const getByIdConnector = require('../connectors/getById')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getOne({
  basePath,
  connect,
  connector = getByIdConnector,
  exampleResponses = {},
  modelName,
  queryParams,
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
    connector: connect ? connector : undefined,
    method: 'get',
    modelName,
    operationId,
    operationType: 'getOne',
    path: `${basePath}/${resourcePlural}/{id}`,
    pathParams: ['id'],
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Find ${resource} by id`,
  }
}
