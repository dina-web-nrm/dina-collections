import createEndpoint from 'utilities/endpointFactory/client'
import { createLookupMammalsResponse, getIndividualGroup } from './mockData'

const extractData = result => result.data
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
    const firstDataItem = extractData(result)[0] // should only be one result, which holds for mammals
    return flattenDataAttributes(firstDataItem)
  },
  mock: ({ request: { queryParams } }) => {
    return { data: [getIndividualGroup(queryParams)] }
  },
  operationId: 'getIndividualGroups',
})

export const LOOKUP_MAMMALS = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  mock: createLookupMammalsResponse,
  operationId: 'getIndividualGroups',
})

export const REGISTER_MAMMAL = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  mock: () => ({ data: getIndividualGroup() }),
  operationId: 'createIndividualGroup',
})

export const UPDATE_INDIVIDUAL_GROUP = createEndpoint({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  mock: () => ({ data: getIndividualGroup() }),
  operationId: 'updateIndividualGroup',
})
