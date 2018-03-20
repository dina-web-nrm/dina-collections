import { createSetter } from 'utilities/stateHelper'

import {
  TAXON_SERVICE_CLEAR_SEARCH_QUERY,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS,
  TAXON_SERVICE_UPDATE_SEARCH_QUERY,
} from '../../actionTypes'

const setLookupError = createSetter(['error'])
const setLookupLoading = createSetter(['loading'])
const setLookupResult = createSetter(['result'])
const setLookupSearchQuery = createSetter(['searchQuery'])

export const getInitialState = () => {
  return {
    error: null,
    loading: false,
    result: [],
    searchQuery: null,
  }
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case TAXON_SERVICE_CLEAR_SEARCH_QUERY: {
      return setLookupSearchQuery(setLookupResult(state, []), null)
    }

    case TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST: {
      return setLookupLoading(state, true)
    }

    case TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL: {
      const emptyResultState = setLookupResult(
        setLookupLoading(state, false),
        []
      )
      return setLookupError(emptyResultState, action.payload)
    }

    case TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS: {
      const emptyErrorState = setLookupError(
        setLookupLoading(state, false),
        null
      )
      return setLookupResult(emptyErrorState, action.payload || [])
    }

    case TAXON_SERVICE_UPDATE_SEARCH_QUERY: {
      return setLookupSearchQuery(state, action.payload)
    }

    default:
      return state
  }
}
