import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'
import {
  SPECIMEN_SERVICE_CREATE_SPECIMEN_SUCCESS,
  SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS,
  SPECIMEN_SERVICE_GET_SPECIMENS_SUCCESS,
  SPECIMEN_SERVICE_UPDATE_SPECIMEN_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case SPECIMEN_SERVICE_CREATE_SPECIMEN_SUCCESS:
    case SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS:
    case SPECIMEN_SERVICE_UPDATE_SPECIMEN_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case SPECIMEN_SERVICE_GET_SPECIMENS_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
