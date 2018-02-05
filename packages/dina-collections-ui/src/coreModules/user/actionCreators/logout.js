import { actionCreators as localStorageAC } from 'redux-module-local-storage'
import { USER_LOG_OUT_SUCCESS } from '../actionTypes'
import { AUTH_TOKEN_KEY } from '../constants'

export default function logout() {
  return dispatch => {
    dispatch(localStorageAC.removeItem(AUTH_TOKEN_KEY))

    setTimeout(() => {
      dispatch({
        type: USER_LOG_OUT_SUCCESS,
      })
    })
  }
}
