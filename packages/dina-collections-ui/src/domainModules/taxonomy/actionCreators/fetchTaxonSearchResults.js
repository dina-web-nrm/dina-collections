import {
  TAXONOMY_FETCH_SEARCH_RESULTS_FAIL,
  TAXONOMY_FETCH_SEARCH_RESULTS_REQUEST,
  TAXONOMY_FETCH_SEARCH_RESULTS_SUCCESS,
} from '../actionTypes'
import { TAXONOMY_SEARCH } from '../endpoints'
import globalSelectors from '../globalSelectors'

export default function fetchTaxonSearchResults(queryParamsOverride) {
  return (dispatch, getState, { apiClient }) => {
    const state = getState()

    const queryParams = queryParamsOverride || {
      'filter[name]': globalSelectors.getLookupSearchFilterName(state),
      search_type: globalSelectors.getLookupSearchType(state),
    }

    dispatch({
      meta: {
        queryParams,
      },
      type: TAXONOMY_FETCH_SEARCH_RESULTS_REQUEST,
    })
    return apiClient
      .call(TAXONOMY_SEARCH, {
        queryParams,
      })
      .then(
        response => {
          dispatch({
            payload: response,
            type: TAXONOMY_FETCH_SEARCH_RESULTS_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            payload: error,
            type: TAXONOMY_FETCH_SEARCH_RESULTS_FAIL,
          })
        }
      )
  }
}
