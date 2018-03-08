import Dependor from '../Dependor'

const errors = {}
const responses = {}
const spies = {}

export const dep = new Dependor({
  errors,
  responses,
  spies,
})

const call = (endpointConfig, ...rest) => {
  const { operationId } = endpointConfig

  if (dep.spies[operationId]) {
    dep.spies[operationId](endpointConfig, ...rest)
  }

  if (dep.errors[operationId]) {
    return Promise.reject(dep.errors[operationId])
  }

  return Promise.resolve(dep.responses[operationId])
}

const mockApiClient = {
  call,
}

export default mockApiClient
