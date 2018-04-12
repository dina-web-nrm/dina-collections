import createEndpoint from 'utilities/endpointFactory/client'

import { places } from './mockData'

export const CREATE_PLACE = createEndpoint({
  operationId: 'createPlace',
})

export const GET_PLACE = createEndpoint({
  operationId: 'getPlace',
})

export const GET_PLACES = createEndpoint({
  mock: () => {
    return {
      data: places,
    }
  },
  operationId: 'getPlaces',
})

export const UPDATE_PLACE = createEndpoint({
  operationId: 'updatePlace',
})
