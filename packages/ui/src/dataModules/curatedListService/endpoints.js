import createEndpoint from 'utilities/endpointFactory/client'

export const GET_PREPARATION_TYPE = createEndpoint({
  operationId: 'preparationTypeGetOne',
})

export const GET_PREPARATION_TYPES = createEndpoint({
  operationId: 'preparationTypeGetMany',
})

export const CREATE_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'featureTypeCreate',
})

export const GET_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'featureTypeGetOne',
})

export const GET_FEATURE_OBSERVATION_TYPES = createEndpoint({
  operationId: 'featureTypeGetMany',
})

export const UPDATE_FEATURE_OBSERVATION_TYPE = createEndpoint({
  operationId: 'featureTypeUpdate',
})
