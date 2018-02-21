const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getRelation({
  basePath,
  connect,
  connector,
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

  const operationId = `get${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    connector: connect ? connector : undefined,
    method: 'get',
    modelName,
    operationId,
    operationType: 'getRelation',
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    resource: relationResource,
    response: {
      examples: exampleResponses,
      format,
    },
    summary: `Find ${resource} -> ${relationKey}`,
  }
}
