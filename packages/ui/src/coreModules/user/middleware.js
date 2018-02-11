import { actionCreators as localStorageAC } from 'redux-module-local-storage'
import { KEYBOARD_SHORTCUTS_TRIGGER } from 'coreModules/keyboardShortcuts/actionTypes'
import { includesModule } from 'coreModules/bootstrap/utilities'
import { BOOTSTRAP_REGISTER_MODULES } from 'coreModules/bootstrap/actionTypes'
import { setLanguage } from 'coreModules/i18n/actionCreators'

import { logout as logoutShortcut } from './shortcuts'

import {
  USER_GET_USER_FAIL,
  USER_GET_USER_PREFERENCES_SUCCESS,
  USER_GET_USER_SUCCESS,
  USER_LOG_IN_SUCCESS,
} from './actionTypes'
import { AUTH_TOKEN_KEY, MODULE_NAME } from './constants'
import globalSelectors from './globalSelectors'
import { getUserPreferences, getUser, logout } from './actionCreators'

const { getAuthToken } = globalSelectors
const { getUserPreferencesLanguage } = globalSelectors

export default function userMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case USER_LOG_IN_SUCCESS: {
        dispatch(localStorageAC.setItem(AUTH_TOKEN_KEY, action.payload))
        dispatch(getUser())
        break
      }

      case USER_GET_USER_SUCCESS: {
        dispatch(getUserPreferences())
        break
      }

      case USER_GET_USER_FAIL: {
        dispatch(logout())
        break
      }
      // might make sense to move this to the app level
      case USER_GET_USER_PREFERENCES_SUCCESS: {
        const preferredLanguage = getUserPreferencesLanguage(getState())
        if (preferredLanguage) {
          dispatch(setLanguage(preferredLanguage))
        }

        break
      }
      case BOOTSTRAP_REGISTER_MODULES: {
        if (includesModule(action, MODULE_NAME)) {
          const authToken = getAuthToken(getState())
          if (authToken) {
            dispatch(getUser())
          } else {
            dispatch(logout())
          }
        }
        break
      }

      // inject this action instead
      case KEYBOARD_SHORTCUTS_TRIGGER: {
        if (action.payload.code === logoutShortcut.code) {
          dispatch(logout())
        }
        break
      }
      default:
        break
    }
    return result
  }
}
