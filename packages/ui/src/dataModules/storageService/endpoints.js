import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_PHYSICAL_UNIT = createEndpoint({
  operationId: 'createPhysicalObject',
})

export const GET_PHYSICAL_UNIT = createEndpoint({
  operationId: 'getPhysicalObject',
})

export const GET_PHYSICAL_UNITS = createEndpoint({
  operationId: 'getPhysicalObjects',
})

export const UPDATE_PHYSICAL_UNIT = createEndpoint({
  operationId: 'updatePhysicalObject',
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

export const UPDATE_PHYSICAL_UNIT_STORAGE_LOCATION = createEndpoint({
  operationId: 'updatePhysicalObjectStorageLocation',
})
