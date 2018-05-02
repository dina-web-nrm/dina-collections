import createEndpoint from 'utilities/endpointFactory/client'

import { taxa } from './mockData'

export const CREATE_TAXON = createEndpoint({
  operationId: 'createTaxon',
})

export const GET_TAXA = createEndpoint({
  mock: () => {
    return taxa
  },
  operationId: 'getTaxa',
})

export const GET_TAXON = createEndpoint({
  operationId: 'getTaxon',
})

export const UPDATE_TAXON = createEndpoint({
  operationId: 'updateTaxon',
})

export const CREATE_TAXON_NAME = createEndpoint({
  operationId: 'createTaxonName',
})

export const GET_TAXON_NAMES = createEndpoint({
  mock: () => {
    return taxa
  },
  operationId: 'getTaxonNames',
})

export const GET_TAXON_NAME = createEndpoint({
  operationId: 'getTaxonName',
})

export const UPDATE_TAXON_NAME = createEndpoint({
  operationId: 'updateTaxonName',
})
