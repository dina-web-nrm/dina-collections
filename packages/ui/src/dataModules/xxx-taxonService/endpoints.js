import createEndpoint from 'utilities/endpointFactory/client'

import { taxa } from './mockData'

export const CREATE_TAXON = createEndpoint({
  operationId: 'taxonCreate',
})

export const GET_TAXA = createEndpoint({
  mock: () => {
    return taxa
  },
  operationId: 'taxonGetMany',
})

export const GET_TAXON = createEndpoint({
  operationId: 'taxonGetOne',
})

export const UPDATE_TAXON = createEndpoint({
  operationId: 'taxonUpdate',
})

export const CREATE_TAXON_NAME = createEndpoint({
  operationId: 'taxonNameCreate',
})

export const GET_TAXON_NAMES = createEndpoint({
  mock: () => {
    return taxa
  },
  operationId: 'taxonNameGetMany',
})

export const GET_TAXON_NAME = createEndpoint({
  operationId: 'taxonNameGetOne',
})

export const UPDATE_TAXON_NAME = createEndpoint({
  operationId: 'taxonNameUpdate',
})
