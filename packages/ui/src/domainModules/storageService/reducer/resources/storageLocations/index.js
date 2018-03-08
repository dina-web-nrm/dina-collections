import { updateResourceInState } from 'utilities/stateHelper'
import {
  STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS,
  STORAGE_SERVICE_GET_STORAGE_LOCATION_SUCCESS,
  STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS:
    case STORAGE_SERVICE_GET_STORAGE_LOCATION_SUCCESS:
    case STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS: {
      return updateResourceInState(state, action)
    }

    default: {
      return state
    }
  }
}
