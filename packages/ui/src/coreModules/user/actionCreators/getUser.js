import {
  USER_GET_USER_REQUEST,
  USER_GET_USER_SUCCESS,
  USER_GET_USER_FAIL,
} from '../actionTypes'
import { GET_USER } from '../endpoints'

export default function getUser() {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: USER_GET_USER_REQUEST,
    })
    return apiClient.call(GET_USER).then(
      response => {
        dispatch({
          payload: response,
          type: USER_GET_USER_SUCCESS,
        })
        return response
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: USER_GET_USER_FAIL,
        })
      }
    )
  }
}
