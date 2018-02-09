import { utils } from 'redux-module-local-storage'

import { USER_PREFERENCES_KEY } from '../constants'

import {
  USER_GET_USER_PREFERENCES_REQUEST,
  USER_GET_USER_PREFERENCES_SUCCESS,
  USER_GET_USER_PREFERENCES_FAIL,
} from '../actionTypes'

export default function getUserPreferences() {
  return dispatch => {
    dispatch({
      type: USER_GET_USER_PREFERENCES_REQUEST,
    })

    return new Promise((resolve, reject) => {
      let userPreferences
      try {
        userPreferences = utils.getItem(USER_PREFERENCES_KEY)
      } catch (err) {
        return reject(err)
      }

      return resolve(userPreferences)
    })
      .then(userPreferences => {
        dispatch({
          payload: userPreferences,
          type: USER_GET_USER_PREFERENCES_SUCCESS,
        })
        return userPreferences
      })
      .catch(error => {
        dispatch({
          error: true,
          payload: error,
          type: USER_GET_USER_PREFERENCES_FAIL,
        })
      })
  }
}
