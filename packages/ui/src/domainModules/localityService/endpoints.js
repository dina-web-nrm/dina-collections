import createEndpoint from 'utilities/endpointFactory/client'

import { curatedLocalities } from './mockData'

export const CREATE_CURATED_LOCALITY = createEndpoint({
  operationId: 'createCuratedLocality',
})

export const GET_CURATED_LOCALITY = createEndpoint({
  operationId: 'getCuratedLocality',
})

export const GET_CURATED_LOCALITIES = createEndpoint({
  mock: () => {
    return {
      data: curatedLocalities,
    }
  },
  operationId: 'getCuratedLocalities',
})

export const UPDATE_CURATED_LOCALITY = createEndpoint({
  operationId: 'updateCuratedLocality',
})
