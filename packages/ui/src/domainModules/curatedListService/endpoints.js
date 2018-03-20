import createEndpoint from 'utilities/endpointFactory/client'

export const CREATE_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'createFeatureObservationType',
})

export const GET_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'getFeatureObservationType',
})

export const GET_FEATURE_OBSERVATION_TYPES = createEndpoint({
  operationId: 'getFeatureObservationTypes',
})

export const UPDATE_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'updateFeatureObservationType',
})
