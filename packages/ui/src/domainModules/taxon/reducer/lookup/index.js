import { createSetter } from 'utilities/stateHelper'

import actionTypes from 'coreModules/crud/actionTypes'
import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from '../../actionTypes'

const {
  taxonName: {
    getMany: {
      fail: failActionType,
      request: requestActionType,
      success: successActionType,
    },
  },
} = actionTypes

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
    case requestActionType: {
      if (action.meta.isLookup) {
        return setLookupLoading(state, true)
      }

      return state
    }

    case failActionType: {
      if (action.meta.isLookup) {
        const emptyResultState = setLookupResult(
          setLookupLoading(state, false),
          []
        )
        return setLookupError(emptyResultState, action.payload)
      }

      return state
    }

    case successActionType: {
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
