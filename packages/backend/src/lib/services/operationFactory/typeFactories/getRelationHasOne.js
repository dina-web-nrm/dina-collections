const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getRelationHasOne({
  basePath,
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

  const operationId = `get${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    ...rest,
    method: 'get',
    operationId,
    operationType: 'getRelationHasOne',
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    relation: {
      ...relation,
      key: relationKey,
    },
    relationKey,
    resource,
    response: {
      examples: exampleResponses,
      format: relationFormat,
      resource: relationResource,
    },
    rootResource: resource,
    summary: `Find ${resource} -> ${relationKey}`,
  }
}
