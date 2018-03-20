import { createSetter } from 'utilities/stateHelper'

import {
  TAXON_SERVICE_CLEAR_SEARCH,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS,
  TAXON_SERVICE_UPDATE_SEARCH_FILTER_NAME,
} from '../../actionTypes'

const setLookupError = createSetter(['error'])
const setLookupLoading = createSetter(['loading'])
const setLookupResult = createSetter(['result'])
const setLookupSearchFilterName = createSetter(['searchFilterName'])

export const getInitialState = () => {
  return {
    error: null,
    loading: false,
    result: [],
    searchFilterName: null,
  }
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case TAXON_SERVICE_CLEAR_SEARCH: {
      return setLookupSearchFilterName(setLookupResult(state, []), null)
    }

    case TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST: {
      return setLookupLoading(state, true)
    }

    case TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL: {
      const emptyResultState = setLookupResult(
        setLookupLoading(state, false),
        []
      )
      return setLookupError(emptyResultState, action.payload.error)
    }

    case TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS: {
      const emptyErrorState = setLookupError(setLookupLoading(state, false), [])
      return setLookupResult(emptyErrorState, action.payload || [])
    }

    case TAXON_SERVICE_UPDATE_SEARCH_FILTER_NAME: {
      return setLookupSearchFilterName(state, action.payload)
    }

    default:
      return state
  }
}
