import {
  COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_FAIL,
  COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_REQUEST,
  COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_SUCCESS,
} from '../actionTypes'
import { GET_INDIVIDUAL_GROUP_BY_CATALOG_NUMBER } from '../endpoints'

export default function getIndividualGroupByCatalogNumber(
  catalogNumber,
  { include = '' } = {}
) {
  const meta = { catalogNumber, include }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_REQUEST,
    })
    return apiClient
      .call(GET_INDIVIDUAL_GROUP_BY_CATALOG_NUMBER, {
        queryParams: { 'filter[catalogNumber]': catalogNumber, include },
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_GET_BY_CATALOG_NUMBER_FAIL,
          })
        }
      )
  }
}
