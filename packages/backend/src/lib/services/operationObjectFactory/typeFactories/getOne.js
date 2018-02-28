const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getOne({
  basePath,
  exampleResponses = {},
  modelName,
  queryParams,
  relations,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}`
  return {
    method: 'get',
    modelName,
    operationId,
    operationType: 'getOne',
    path: `${basePath}/${resourcePlural}/{id}`,
    pathParams: ['id'],
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations: buildRelations({
        basePath,
        relations,
        resourcePlural,
      }),
    },
    summary: `Find ${resource} by id`,
  }
}
