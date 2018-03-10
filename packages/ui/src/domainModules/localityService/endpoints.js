import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_CURATED_LOCALITY = createEndpoint({
  operationId: 'createCuratedLocality',
})

export const GET_CURATED_LOCALITY = createEndpoint({
  operationId: 'getCuratedLocality',
})

export const GET_CURATED_LOCALITIES = createEndpoint({
  operationId: 'getCuratedLocalities',
})

export const UPDATE_CURATED_LOCALITY = createEndpoint({
  operationId: 'updateCuratedLocality',
})
