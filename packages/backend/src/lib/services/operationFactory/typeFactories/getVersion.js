const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getVersion({
  basePath,
  exampleResponses = {},
  queryParams,
  relations: relationsInput,
  resource,
  resourcePlural,
  ...rest
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}Version`
  const relations = buildRelations({
    basePath,
    relations: relationsInput,
    resourcePlural,
  })

  return {
    ...rest,
    description:
      'The id of the returned resource is the versionId and not the ordinary id',
    method: 'get',
    operationId,
    operationType: 'getVersion',
    path: `${basePath}/${resourcePlural}/{id}/versions/{versionId}`,
    pathParams: ['id', 'versionId'],
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Find ${resource} version by id and versionId`,
  }
}
