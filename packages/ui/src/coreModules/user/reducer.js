import {
  USER_GET_USER_FAIL,
  USER_GET_USER_PREFERENCES_SUCCESS,
  USER_GET_USER_SUCCESS,
  USER_LOG_IN_FAIL,
  USER_LOG_OUT_SUCCESS,
  USER_UPDATE_USER_PREFERENCES_SUCCESS,
} from './actionTypes'

const initState = {
  config: null,
  loading: true,
  preferences: null,
  user: null,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case USER_GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case USER_GET_USER_FAIL:
    case USER_LOG_OUT_SUCCESS:
    case USER_LOG_IN_FAIL: {
      return {
        ...state,
        loading: false,
        preferences: null,
        user: null,
      }
    }
    case USER_GET_USER_PREFERENCES_SUCCESS:
    case USER_UPDATE_USER_PREFERENCES_SUCCESS: {
      return {
        ...state,
        preferences: action.payload,
      }
    }
    default:
      return state
  }
}
