const getManyConnector = require('../connectors/getMany')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getMany({
  basePath,
  connect,
  connector = getManyConnector,
  modelName,
  queryParams,
  relations,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resourcePlural)}`
  return {
    method: 'get',
    operationId,
    path: `${basePath}/${resourcePlural}`,
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
    summary: `Find ${resourcePlural}`,
  }
}
