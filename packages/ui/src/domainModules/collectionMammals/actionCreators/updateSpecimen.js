import {
  COLLECTION_MAMMALS_UPDATE_SPECIMEN_FAIL,
  COLLECTION_MAMMALS_UPDATE_SPECIMEN_REQUEST,
  COLLECTION_MAMMALS_UPDATE_SPECIMEN_SUCCESS,
} from '../actionTypes'
import { UPDATE_SPECIMEN } from '../endpoints'

import getSpecimenById from './getSpecimenById'

export default function updateSpecimen(
  { id, ...attributes },
  throwError = true
) {
  const body = {
    data: {
      attributes,
    },
  }
  const meta = {
    body,
    id,
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_UPDATE_SPECIMEN_REQUEST,
    })

    return apiClient
      .call(UPDATE_SPECIMEN, {
        body,
        pathParams: { id },
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_UPDATE_SPECIMEN_SUCCESS,
          })
          dispatch(getSpecimenById(id))
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_UPDATE_SPECIMEN_FAIL,
          })
          // for redux form
          if (throwError) {
            throw error
          }
        }
      )
  }
}
