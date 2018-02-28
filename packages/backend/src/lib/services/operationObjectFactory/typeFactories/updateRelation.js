const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function updateRelation({
  basePath,
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
  const { format: relationFormat, resource: relationResource } = relation

  const operationId = `update${capitalizeFirstLetter(
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
    method: 'patch',
    operationId,
    operationType: 'updateRelation',
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    request: {
      exampleRequests,
      format: relationFormat,
      modelReference: true,
      resource: relationResource,
    },
    resource,
    response: {
      examples: exampleResponses,
      format: relationFormat,
      resource,
    },
    summary: `Update ${resource} -> ${relationKey}`,
  }
}
