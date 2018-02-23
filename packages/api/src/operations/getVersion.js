const getVersionConnector = require('../connectors/getVersion')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getVersion({
  basePath,
  connect,
  connector = getVersionConnector,
  exampleResponses = {},
  modelName,
  queryParams,
  relations: relationsInput,
  resource,
  resourcePlural,
}) {
  const connectorOptions = {
    resource,
  }
  const operationId = `get${capitalizeFirstLetter(resource)}Version`
  const relations = buildRelations({
    basePath,
    relations: relationsInput,
    resourcePlural,
  })

  return {
    connector: connect ? connector : undefined,
    connectorOptions,
    method: 'get',
    modelName,
    operationId,
    operationType: 'getVersion',
    path: `${basePath}/${resourcePlural}/{id}/versions/{versionId}`,
    pathParams: ['id', 'versionId'],
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Find ${resource} version by id and versionId`,
  }
}
