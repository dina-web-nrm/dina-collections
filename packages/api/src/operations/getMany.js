const getManyConnector = require('../connectors/getMany')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getMany({
  basePath,
  connect,
  connector = getManyConnector,
  exampleResponses = {},
  includeRelations,
  modelName,
  queryParams,
  relations,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resourcePlural)}`
  return {
    connector: connect ? connector : undefined,
    connectorOptions: {
      includeRelations,
      modelName,
      relations,
      resource,
    },
    method: 'get',
    modelName,
    operationId,
    operationType: 'getMany',
    path: `${basePath}/${resourcePlural}`,
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations: buildRelations({
        basePath,
        relations,
        resourcePlural,
      }),
    },
    summary: `Find ${resourcePlural}`,
  }
}
