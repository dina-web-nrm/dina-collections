import {
  USER_LOG_IN_FAIL,
  USER_LOG_IN_REQUEST,
  USER_LOG_IN_SUCCESS,
} from '../actionTypes'
import { LOG_IN } from '../endpoints'

export default function logIn({ username, password, throwError = true } = {}) {
  const body = {
    client_id: 'dina-rest',
    grant_type: 'password',
    password,
    username,
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: USER_LOG_IN_REQUEST,
    })
    return apiClient
      .call(LOG_IN, {
        body,
      })
      .then(
        response => {
          dispatch({
            payload: response,
            type: USER_LOG_IN_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            payload: error,
            type: USER_LOG_IN_FAIL,
          })
          // for redux form
          if (throwError) {
            throw error
          }
        }
      )
  }
}
