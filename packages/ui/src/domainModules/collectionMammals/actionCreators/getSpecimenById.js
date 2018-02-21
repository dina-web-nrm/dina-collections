import {
  COLLECTION_MAMMALS_GET_SPECIMEN_BY_ID_FAIL,
  COLLECTION_MAMMALS_GET_SPECIMEN_BY_ID_REQUEST,
  COLLECTION_MAMMALS_GET_SPECIMEN_BY_ID_SUCCESS,
} from '../actionTypes'
import { GET_SPECIMEN_BY_ID } from '../endpoints'

export default function getSpecimenById(id, { include } = {}) {
  const meta = { id, include }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_GET_SPECIMEN_BY_ID_REQUEST,
    })
    return apiClient
      .call(GET_SPECIMEN_BY_ID, {
        pathParams: { id },
        queryParams: { include },
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_GET_SPECIMEN_BY_ID_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_GET_SPECIMEN_BY_ID_FAIL,
          })
        }
      )
  }
}
