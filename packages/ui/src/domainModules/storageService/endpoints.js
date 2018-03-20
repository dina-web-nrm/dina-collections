import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_PHYSICAL_UNIT = createEndpoint({
  operationId: 'createPhysicalUnit',
})

export const GET_PHYSICAL_UNIT = createEndpoint({
  operationId: 'getPhysicalUnit',
})

export const GET_PHYSICAL_UNITS = createEndpoint({
  operationId: 'getPhysicalUnits',
})

export const UPDATE_PHYSICAL_UNIT = createEndpoint({
  operationId: 'updatePhysicalUnit',
})

export const CREATE_STORAGE_LOCATION = createEndpoint({
  operationId: 'createStorageLocation',
})

export const GET_STORAGE_LOCATION = createEndpoint({
  operationId: 'getStorageLocation',
})

export const GET_STORAGE_LOCATIONS = createEndpoint({
  operationId: 'getStorageLocations',
})

export const UPDATE_STORAGE_LOCATION = createEndpoint({
  operationId: 'updateStorageLocation',
})
