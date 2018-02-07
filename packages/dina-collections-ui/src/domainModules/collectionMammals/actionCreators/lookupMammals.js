import {
  COLLECTION_MAMMALS_LOOKUP_MAMMALS_FAIL,
  COLLECTION_MAMMALS_LOOKUP_MAMMALS_REQUEST,
  COLLECTION_MAMMALS_LOOKUP_MAMMALS_SUCCESS,
} from '../actionTypes'
import { LOOKUP_MAMMALS } from '../endpoints'

export default function lookupMammals(filterParams = {}) {
  const queryParams = Object.keys(filterParams).reduce(
    (query, filterName) => {
      return {
        ...query,
        [`filter[${filterName}]`]: filterParams[filterName],
      }
    },
    { include: 'identifications,physicalUnits.catalogedUnit' } // TODO: centralize include strings
  )

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: COLLECTION_MAMMALS_LOOKUP_MAMMALS_REQUEST,
    })
    return apiClient
      .call(LOOKUP_MAMMALS, {
        queryParams,
      })
      .then(
        response => {
          dispatch({
            payload: response,
            type: COLLECTION_MAMMALS_LOOKUP_MAMMALS_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            payload: error,
            type: COLLECTION_MAMMALS_LOOKUP_MAMMALS_FAIL,
          })
        }
      )
  }
}
