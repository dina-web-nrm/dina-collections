import createEndpoint from 'utilities/endpointFactory/client'
import { createLookupMammalsResponse, getSpecimen } from './mockData'

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
  mock: ({ request: { queryParams } }) => {
    return { data: [getSpecimen({ queryParams })] }
  },
  operationId: 'getSpecimens',
})

export const GET_SPECIMEN = createEndpoint({
  mock: ({ request: { pathParams, queryParams } }) => {
    return { data: getSpecimen({ pathParams, queryParams }) }
  },
  operationId: 'getSpecimen',
})

export const LOOKUP_MAMMALS = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  mock: createLookupMammalsResponse,
  operationId: 'getSpecimens',
})

export const REGISTER_MAMMAL = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  mock: () => ({ data: getSpecimen() }),
  operationId: 'createSpecimen',
})

export const UPDATE_SPECIMEN = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  mock: () => ({ data: getSpecimen() }),
  operationId: 'updateSpecimen',
})
