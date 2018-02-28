const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getRelation({
  basePath,
  exampleResponses = {},
  modelName,
  queryParams,
  relationKey,
  relations,
  resource,
  resourcePlural,
}) {
  const relation = relations[relationKey]
  const { format: relationFormat, resource: relationResource } = relation

  const operationId = `get${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    connectorOptions: {
      modelName,
      relation: {
        ...relation,
        key: relationKey,
      },
      resource,
    },
    method: 'get',
    operationId,
    operationType: 'getRelation',
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    relationKey,
    resource,
    response: {
      examples: exampleResponses,
      format: relationFormat,
      resource: relationResource,
    },
    rootModelName: modelName,
    rootResource: resource,
    summary: `Find ${resource} -> ${relationKey}`,
  }
}
