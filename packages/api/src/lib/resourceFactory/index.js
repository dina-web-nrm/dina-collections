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
    const { operation } = endpoint
    if (!operation) {
      throw new Error('operation not provided')
    }
    const { operationId, ...rest } = operation({
      basePath,
      modelName,
      relations,
      resource,
      resourcePlural,
      ...endpoint,
    })
    log.debug(`Create operation: ${resource} -> ${operationId}`)
    return {
      ...operations,
      [operationId]: rest, // eslint-disable-line
    }
  }, {})
}
