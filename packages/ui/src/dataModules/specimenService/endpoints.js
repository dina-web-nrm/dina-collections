import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_SPECIMEN = createEndpoint({
  operationId: 'createSpecimen',
})

export const GET_SPECIMEN = createEndpoint({
  operationId: 'getSpecimen',
})

export const GET_SPECIMENS = createEndpoint({
  operationId: 'getSpecimens',
})

export const UPDATE_SPECIMEN = createEndpoint({
  operationId: 'updateSpecimen',
})
