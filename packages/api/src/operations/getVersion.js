const getVersionConnector = require('../connectors/getVersion')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function getVersion({
  basePath,
  connect,
  connector = getVersionConnector,
  modelName,
  relations: relationsInput,
  resource,
  resourcePlural,
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}Version`
  const relations = buildRelations({
    basePath,
    relations: relationsInput,
    resourcePlural,
  })

  return {
    connector: connect ? connector : undefined,
    method: 'get',
    modelName,
    operationId,
    path: `${basePath}/${resourcePlural}/{id}/versions/{versionId}`,
    pathParams: ['id', 'versionId'],
    resource,
    response: {
      format: 'object',
      relations,
    },
    summary: `Find ${resource} version by id and versionId`,
  }
}
