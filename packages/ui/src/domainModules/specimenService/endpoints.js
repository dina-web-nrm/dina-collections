import createEndpoint from 'utilities/endpointFactory/client'

import { createLookupMammalsResponse, getSpecimen } from './mockData'

export const CREATE_SPECIMEN = createEndpoint({
  mock: () => ({ data: getSpecimen() }),
  operationId: 'createSpecimen',
})

export const GET_SPECIMEN = createEndpoint({
  mock: () => ({ data: getSpecimen() }),
  operationId: 'getSpecimen',
})

export const GET_SPECIMENS = createEndpoint({
  mock: createLookupMammalsResponse,
  operationId: 'getSpecimens',
})

export const UPDATE_SPECIMEN = createEndpoint({
  mock: () => ({ data: getSpecimen() }),
  operationId: 'updateSpecimen',
})
