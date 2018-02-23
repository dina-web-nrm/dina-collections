const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function updateRelation({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  queryParams,
  relationKey,
  relations,
  resource,
  resourcePlural,
  ...rest
}) {
  const relation = relations[relationKey]
  const { format: relationFormat, resource: relationResource } = relation

  const operationId = `update${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    ...rest,
    method: 'patch',
    operationId,
    operationType: 'updateRelationHasOne',
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    relation: {
      ...relation,
      key: relationKey,
    },
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
