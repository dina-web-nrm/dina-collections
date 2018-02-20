const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getRelation({
  basePath,
  connect,
  connector,
  modelName,
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
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    resource: relationResource,
    response: {
      format,
    },
    summary: `Find ${resource} -> ${relationKey}`,
  }
}
