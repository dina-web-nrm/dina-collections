import { createSetter } from 'utilities/stateHelper'

import {
  TAXON_SERVICE_GET_TAXON_NAMES_FAIL,
  TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
  TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS,
} from 'dataModules/taxonService/actionTypes'

import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from '../../actionTypes'

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
    case TAXON_SERVICE_GET_TAXON_NAMES_REQUEST: {
      if (action.meta.isLookup) {
        return setLookupLoading(state, true)
      }

      return state
    }

    case TAXON_SERVICE_GET_TAXON_NAMES_FAIL: {
      if (action.meta.isLookup) {
        const emptyResultState = setLookupResult(
          setLookupLoading(state, false),
          []
        )
        return setLookupError(emptyResultState, action.payload)
      }

      return state
    }

    case TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS: {
      if (action.meta.isLookup) {
        const emptyErrorState = setLookupError(
          setLookupLoading(state, false),
          null
        )
        return setLookupResult(emptyErrorState, action.payload || [])
      }

      return state
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
