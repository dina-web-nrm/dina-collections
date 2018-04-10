import createEndpoint from 'utilities/endpointFactory/client'

export const GET_DISTINGUISHED_UNIT_TYPE = createEndpoint({
  operationId: 'getPreparationType',
})

export const GET_DISTINGUISHED_UNIT_TYPES = createEndpoint({
  operationId: 'getPreparationTypes',
})

export const CREATE_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'createFeatureType',
})

export const GET_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'getFeatureType',
})

export const GET_FEATURE_OBSERVATION_TYPES = createEndpoint({
  operationId: 'getFeatureTypes',
})

export const UPDATE_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'updateFeatureType',
})
