const getVersionsConnector = require('../connectors/getVersions')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getVersions({
  basePath,
  connect,
  connector = getVersionsConnector,
  exampleResponses = {},
  modelName,
  queryParams,
  relations,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}Versions`
  return {
    connector: connect ? connector : undefined,
    method: 'get',
    modelName,
    operationId,
    operationType: 'getVersions',
    path: `${basePath}/${resourcePlural}/{id}/versions`,
    pathParams: ['id'],
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
    summary: `Find ${resourcePlural} versions`,
  }
}
