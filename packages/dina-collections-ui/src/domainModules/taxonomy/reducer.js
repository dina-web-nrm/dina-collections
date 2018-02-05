import { createSetter } from 'utilities/stateHelper'

import {
  TAXONOMY_CLEAR_SEARCH,
  TAXONOMY_FETCH_SEARCH_RESULTS_FAIL,
  TAXONOMY_FETCH_SEARCH_RESULTS_REQUEST,
  TAXONOMY_FETCH_SEARCH_RESULTS_SUCCESS,
  TAXONOMY_UPDATE_SEARCH_FILTER_NAME,
} from './actionTypes'

const setLookupError = createSetter(['lookup', 'error'])
const setLookupLoading = createSetter(['lookup', 'loading'])
const setLookupResult = createSetter(['lookup', 'result'])
const setLookupSearchFilterName = createSetter(['lookup', 'searchFilterName'])

const initialState = {
  lookup: {
    error: null,
    loading: false,
    result: [],
    searchFilterName: null,
    searchType: 'partial', // not possible to change for now
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TAXONOMY_CLEAR_SEARCH: {
      return setLookupSearchFilterName(setLookupResult(state, []), null)
    }

    case TAXONOMY_FETCH_SEARCH_RESULTS_REQUEST: {
      return setLookupLoading(state, true)
    }

    case TAXONOMY_FETCH_SEARCH_RESULTS_FAIL: {
      const emptyResultState = setLookupResult(
        setLookupLoading(state, false),
        []
      )
      return setLookupError(emptyResultState, action.payload.error)
    }

    case TAXONOMY_FETCH_SEARCH_RESULTS_SUCCESS: {
      const emptyErrorState = setLookupError(setLookupLoading(state, false), [])
      return setLookupResult(emptyErrorState, action.payload.data || [])
    }

    case TAXONOMY_UPDATE_SEARCH_FILTER_NAME: {
      return setLookupSearchFilterName(state, action.payload)
    }

    default:
      return state
  }
}
