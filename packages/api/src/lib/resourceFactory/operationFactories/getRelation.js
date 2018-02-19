const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getRelation({
  basePath,
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
    method: 'get',
    operationId,
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    resource: relationResource,
    response: {
      format,
    },
    summary: `Find ${resource} -> ${relationKey}`,
  }
}
