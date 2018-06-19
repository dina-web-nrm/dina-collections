import Dependor from '../Dependor'

export default () => {
  const errors = {}
  const responses = {}
  const spies = {}

  const dep = new Dependor({
    errors,
    responses,
    spies,
  })

  const call = (endpointConfig, ...rest) => {
    let operationId
    if (typeof endpointConfig === 'string') {
      operationId = endpointConfig
    } else {
      operationId = endpointConfig.operationId // eslint-disable-line prefer-destructuring
    }
    if (dep.spies[operationId]) {
      dep.spies[operationId](endpointConfig, ...rest)
    }

    if (dep.errors[operationId]) {
      return Promise.reject(dep.errors[operationId] || {})
    }

    return Promise.resolve(dep.responses[operationId] || {})
  }

  const createJsonApiMethod = operationType => {
    return (resourceType, ...rest) => {
      if (dep.spies[resourceType] && dep.spies[resourceType][operationType]) {
        dep.spies[resourceType][operationType](resourceType, ...rest)
      }

      if (dep.errors[resourceType] && dep.errors[resourceType][operationType]) {
        return Promise.reject(dep.errors[resourceType][operationType] || {})
      }

      return Promise.resolve(
        (dep.responses[resourceType] &&
          dep.responses[resourceType][operationType]) ||
          {}
      )
    }
  }

  const mockApiClient = {
    call,
    create: createJsonApiMethod('create'),
    getMany: createJsonApiMethod('getMany'),
    getOne: createJsonApiMethod('getOne'),
    update: createJsonApiMethod('update'),
  }

  return {
    apiClientDependencies: dep,
    mockApiClient,
  }
}
