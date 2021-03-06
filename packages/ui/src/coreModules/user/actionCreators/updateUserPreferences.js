import { actionCreators as localStorageActionCreators } from 'redux-module-local-storage'

import { USER_PREFERENCES_KEY } from '../constants'

import {
  USER_UPDATE_USER_PREFERENCES_REQUEST,
  USER_UPDATE_USER_PREFERENCES_SUCCESS,
  USER_UPDATE_USER_PREFERENCES_FAIL,
} from '../actionTypes'

export default function updateUserPreferences(preferences) {
  return dispatch => {
    dispatch({
      type: USER_UPDATE_USER_PREFERENCES_REQUEST,
    })

    return Promise.resolve()
      .then(() => {
        dispatch(
          localStorageActionCreators.setItem(USER_PREFERENCES_KEY, preferences)
        )
        return preferences
      })
      .then(userPreferences => {
        dispatch({
          payload: userPreferences,
          type: USER_UPDATE_USER_PREFERENCES_SUCCESS,
        })
        return userPreferences
      })
      .catch(error => {
        dispatch({
          error: true,
          payload: error,
          type: USER_UPDATE_USER_PREFERENCES_FAIL,
        })
      })
  }
}
