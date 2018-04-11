import createEndpoint from 'utilities/endpointFactory/client'

import { places } from './mockData'

export const CREATE_CURATED_LOCALITY = createEndpoint({
  operationId: 'createPlace',
})

export const GET_CURATED_LOCALITY = createEndpoint({
  operationId: 'getPlace',
})

export const GET_CURATED_LOCALITIES = createEndpoint({
  mock: () => {
    return {
      data: places,
    }
  },
  operationId: 'getPlaces',
})

export const UPDATE_CURATED_LOCALITY = createEndpoint({
  operationId: 'updatePlace',
})
