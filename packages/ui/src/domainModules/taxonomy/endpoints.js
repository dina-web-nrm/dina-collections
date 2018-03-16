import createEndpoint from 'utilities/endpointFactory/client'
import { taxonomyResponse } from './mockData'

export const TAXONOMY_SEARCH = createEndpoint({
  mock: () => {
    return taxonomyResponse
  },
  operationId: 'getTaxaByName',
})
