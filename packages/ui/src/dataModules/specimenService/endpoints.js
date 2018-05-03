import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_SPECIMEN = createEndpoint({
  operationId: 'specimenCreate',
})

export const GET_SPECIMEN = createEndpoint({
  operationId: 'specimenGetOne',
})

export const GET_SPECIMENS = createEndpoint({
  operationId: 'specimenGetMany',
})

export const UPDATE_SPECIMEN = createEndpoint({
  operationId: 'specimenUpdate',
})
