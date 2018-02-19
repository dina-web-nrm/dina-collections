const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')
const buildRelations = require('./utilities/buildRelations')

module.exports = function createOperation({
  basePath,
  resourcePlural,
  resource,
  relations,
  // modelName,
  // connect,
}) {
  const operationId = `get${capitalizeFirstLetter(resourcePlural)}`

  return {
    method: 'get',
    operationId,
    path: `${basePath}/${resourcePlural}`,
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
