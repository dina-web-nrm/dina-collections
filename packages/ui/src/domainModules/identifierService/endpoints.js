import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_CATALOG_NUMBER = createEndpoint({
  operationId: 'createCatalogNumber',
})

export const GET_CATALOG_NUMBER = createEndpoint({
  operationId: 'getCatalogNumber',
})

export const GET_CATALOG_NUMBERS = createEndpoint({
  operationId: 'getCatalogNumbers',
})

export const UPDATE_CATALOG_NUMBER = createEndpoint({
  operationId: 'updateCatalogNumber',
})
