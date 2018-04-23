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

  const mockApiClient = {
    call,
  }

  return {
    apiClientDependencies: dep,
    mockApiClient,
  }
}
