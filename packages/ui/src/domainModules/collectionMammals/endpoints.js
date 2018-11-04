import createEndpoint from 'utilities/endpointFactory/client'

const extractData = result => {
  return result.data
}
const flattenDataAttributes = data => {
  if (!data) {
    return data
  }

  if (Array.isArray(data)) {
    return data.map(dataItem => flattenDataAttributes(dataItem))
  }

  const { attributes, id, type } = data

  return {
    id,
    type,
    ...attributes,
  }
}

export const GET_INDIVIDUAL_GROUP_BY_CATALOG_NUMBER = createEndpoint({
  mapResponse: result => {
    const data = extractData(result)
    const firstDataItem = data && data[0] // should only be one result, which holds for mammals
    return flattenDataAttributes(firstDataItem)
  },

  operationId: 'specimenGetMany',
})

export const GET_SPECIMEN = createEndpoint({
  operationId: 'specimenGetOne',
})

export const LOOKUP_MAMMALS = createEndpoint({
  operationId: 'specimenGetMany',
})

export const REGISTER_MAMMAL = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  operationId: 'specimenCreate',
})

export const UPDATE_SPECIMEN = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  operationId: 'specimenUpdate',
})
