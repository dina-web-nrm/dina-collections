const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function updateRelation({
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

  const operationId = `update${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    connector: connect ? connector : undefined,
    method: 'patch',
    modelName,
    operationId,
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    request: {
      format,
      resource: 'modelReference',
    },
    resource: relationResource,
    response: {
      format,
    },
    summary: `Update ${resource} -> ${relationKey}`,
  }
}
