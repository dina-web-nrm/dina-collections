import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'
import {
  PLACE_SERVICE_CREATE_PLACE_SUCCESS,
  PLACE_SERVICE_GET_PLACE_SUCCESS,
  PLACE_SERVICE_GET_PLACES_SUCCESS,
  PLACE_SERVICE_UPDATE_PLACE_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case PLACE_SERVICE_CREATE_PLACE_SUCCESS:
    case PLACE_SERVICE_GET_PLACE_SUCCESS:
    case PLACE_SERVICE_UPDATE_PLACE_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case PLACE_SERVICE_GET_PLACES_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
