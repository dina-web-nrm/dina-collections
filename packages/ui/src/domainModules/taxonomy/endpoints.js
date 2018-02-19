import immutable from 'object-path-immutable'

import createEndpoint from 'utilities/endpointFactory/client'
import { immutableReplace } from 'utilities/stateHelper'
import { taxonomyResponse } from './mockData'

const baseUrl = '/taxonomy'

export const TAXONOMY_SEARCH = createEndpoint({
  baseUrl,
  mapResponse: res => {
    if (!res.data) {
      return res
    }

    return immutable.set(
      res,
      'data',
      res.data.map(item => {
        return immutableReplace(item, {
          newPath: 'attributes.scientificName',
          oldPath: 'attributes.scientific_name',
        })
      })
    )
  },
  mock: () => {
    return taxonomyResponse
  },
  operationId: 'getTaxaByName',
})
