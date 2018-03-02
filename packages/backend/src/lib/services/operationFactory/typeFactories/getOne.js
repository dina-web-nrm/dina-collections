const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getOne({
  basePath,
  exampleResponses = {},
  operationId,
  queryParams,
  relations,
  resource,
  resourcePlural,
  ...rest
}) {
  return {
    ...rest,
    method: 'get',
    operationId: operationId || `get${capitalizeFirstLetter(resource)}`,
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
