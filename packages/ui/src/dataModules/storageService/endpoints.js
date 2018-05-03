import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_PHYSICAL_UNIT = createEndpoint({
  operationId: 'physicalObjectCreate',
})

export const GET_PHYSICAL_UNIT = createEndpoint({
  operationId: 'physicalObjectGetOne',
})

export const GET_PHYSICAL_UNITS = createEndpoint({
  operationId: 'physicalObjectGetMany',
})

export const UPDATE_PHYSICAL_UNIT = createEndpoint({
  operationId: 'physicalObjectUpdate',
})

export const CREATE_STORAGE_LOCATION = createEndpoint({
  operationId: 'storageLocationCreate',
})

export const GET_STORAGE_LOCATION = createEndpoint({
  operationId: 'storageLocationGetOne',
})

export const GET_STORAGE_LOCATIONS = createEndpoint({
  operationId: 'storageLocationGetMany',
})

export const UPDATE_STORAGE_LOCATION = createEndpoint({
  operationId: 'storageLocationUpdate',
})

export const UPDATE_PHYSICAL_UNIT_STORAGE_LOCATION = createEndpoint({
  operationId: 'physicalObjectUpdateRelationHasOneStorageLocation',
})
