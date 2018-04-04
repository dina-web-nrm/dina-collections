import createEndpoint from 'utilities/endpointFactory/client'

import { taxa } from './mockData'

export const CREATE_TAXON = createEndpoint({
  operationId: 'createTaxon',
})

export const GET_TAXA_BY_NAME = createEndpoint({
  mock: () => {
    return taxa
  },
  operationId: 'getTaxaByName',
})

export const GET_TAXON = createEndpoint({
  operationId: 'getTaxonById',
})

export const UPDATE_TAXON = createEndpoint({
  operationId: 'updateTaxon',
})
