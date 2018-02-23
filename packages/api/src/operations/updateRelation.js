const updateRelationHasOneConnector = require('../connectors/updateRelationHasOne')
const updateRelationHasManyConnector = require('../connectors/updateRelationHasMany')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function updateRelation({
  basePath,
  connect,
  connector: customConnector,
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
  const {
    format: relationFormat,
    resource: relationResource,
    type: relationType,
  } = relation

  const connector =
    customConnector || relationType === 'hasOne'
      ? updateRelationHasOneConnector
      : updateRelationHasManyConnector

  const operationId = `update${capitalizeFirstLetter(
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
