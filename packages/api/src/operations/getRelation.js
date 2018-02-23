const getRelationHasOneConnector = require('../connectors/getRelationHasOne')
const getRelationHasManyConnector = require('../connectors/getRelationHasMany')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getRelation({
  basePath,
  connect,
  connector: customConnector,
  exampleResponses = {},
  modelName,
  queryParams,
  relationKey,
  relations,
  resource,
  resourcePlural,
}) {
  const relation = relations[relationKey]
  const {
    format: relationFormat,
    resource: relationResource,
    type: relationType,
  } = relation

  const connector =
    customConnector || relationType === 'hasOne'
      ? getRelationHasOneConnector
      : getRelationHasManyConnector

  const operationId = `get${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    connector: connect ? connector : undefined,
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
