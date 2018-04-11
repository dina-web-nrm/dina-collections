import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'
import {
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS,
  STORAGE_SERVICE_GET_PHYSICAL_UNIT_SUCCESS,
  STORAGE_SERVICE_GET_PHYSICAL_UNITS_SUCCESS,
  STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS:
    case STORAGE_SERVICE_GET_PHYSICAL_UNIT_SUCCESS:
    case STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case STORAGE_SERVICE_GET_PHYSICAL_UNITS_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
