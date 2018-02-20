const getVersionsConnector = require('../connectors/getVersions')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getVersions({
  basePath,
  connect,
  connector = getVersionsConnector,
  modelName,
  queryParams,
  relations,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}Versions`
  return {
    method: 'get',
    operationId,
    path: `${basePath}/${resourcePlural}/{id}/versions`,
    pathParams: ['id'],
    queryParams,
    resource,
    response: {
      format: 'array',
      relations: buildRelations({
        basePath,
        relations,
        resourcePlural,
      }),
    },
    routeHandler: connect ? connector({ modelName }) : undefined,
    summary: `Find ${resourcePlural} versions`,
  }
}
