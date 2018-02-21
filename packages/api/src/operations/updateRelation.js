const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function updateRelation({
  basePath,
  connect,
  connector,
  exampleRequests = {},
  exampleResponses = {},
  modelName,
  queryParams,
  relationKey,
  relations,
  resource,
  resourcePlural,
}) {
  const relation = relations[relationKey]
  const { format, resource: relationResource } = relation

  const operationId = `update${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    connector: connect ? connector : undefined,
    method: 'patch',
    modelName,
    operationId,
    operationType: 'updateRelation',
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    request: {
      exampleRequests,
      format,
      resource: 'modelReference',
    },
    resource: relationResource,
    response: {
      examples: exampleResponses,
      format,
    },
    summary: `Update ${resource} -> ${relationKey}`,
  }
}
