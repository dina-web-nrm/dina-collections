const createLog = require('../../utilities/log')

const log = createLog('lib/resourceFactory')

module.exports = function createResource({
  basePath,
  modelName: modelNameInput,
  endpoints,
  relations,
  resource,
  resourcePlural: resourcePluralInput,
}) {
  log.debug(`Create resource: ${resource}`)
  const resourcePlural = resourcePluralInput || `${resource}s`
  const modelName = modelNameInput || resource

  if (endpoints.length === 0) {
    throw new Error(`Have to provide endpoints. Missing for: ${resource}`)
  }

  return endpoints.reduce((operations, endpoint) => {
    const { operation, queryParams: queryParamsInput = {} } = endpoint
    if (!operation) {
      throw new Error('operation not provided')
    }

    const queryParams = {
      ...queryParamsInput,
      exampleId: {
        description:
          'Set to return a specific example. If example dont exist 404 will be returned. Only active when combined with mock parameter',
        example: 'primary',
        schema: {
          default: 'primary',
          type: 'string',
        },
      },
      mock: {
        description: 'Will return mock data',
        example: 'false',
        schema: {
          default: 'false',
          type: 'string',
        },
      },
    }

    const { operationId, ...rest } = operation({
      basePath,
      modelName,
      relations,
      resource,
      resourcePlural,
      ...endpoint,
      queryParams, // eslint-disable-line
    })
    log.debug(`Create operation: ${resource} -> ${operationId}`)
    return {
      ...operations,
      [operationId]: rest, // eslint-disable-line
    }
  }, {})
}
