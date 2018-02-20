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
    connector: connect ? connector : undefined,
    method: 'get',
    modelName,
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
    summary: `Find ${resourcePlural}`,
  }
}
