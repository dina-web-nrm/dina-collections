import { createSetter } from 'utilities/stateHelper'

import {
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS,
  TAXON_SERVICE_UPDATE_SEARCH_QUERY,
} from '../../actionTypes'

const setLookupError = createSetter(['error'])
const setLookupLoading = createSetter(['loading'])
const setLookupResult = createSetter(['result'])

export const getInitialState = () => {
  return {
    error: null,
    loading: false,
    result: [],
    searchQueries: {},
  }
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
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
      return {
        ...state,
        searchQueries: {
          ...state.searchQueries,
          [action.meta.inputName]: action.payload,
        },
      }
    }

    default:
      return state
  }
}
