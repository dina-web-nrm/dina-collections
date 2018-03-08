import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_PHYSICAL_UNIT = createEndpoint({
  methodName: 'post',
  operationId: 'createPhysicalUnit',
})

export const GET_PHYSICAL_UNIT = createEndpoint({
  methodName: 'get',
  operationId: 'getPhysicalUnit',
})

export const UPDATE_PHYSICAL_UNIT = createEndpoint({
  methodName: 'put',
  operationId: 'updatePhysicalUnit',
})

export const CREATE_STORAGE_LOCATION = createEndpoint({
  methodName: 'post',
  operationId: 'createStorageLocation',
})

export const GET_STORAGE_LOCATION = createEndpoint({
  methodName: 'get',
  operationId: 'getStorageLocation',
})

export const UPDATE_STORAGE_LOCATION = createEndpoint({
  methodName: 'put',
  operationId: 'updateStorageLocation',
})
