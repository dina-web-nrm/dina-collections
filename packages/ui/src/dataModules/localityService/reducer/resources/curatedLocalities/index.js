import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'
import {
  LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_SUCCESS,
  LOCALITY_SERVICE_GET_CURATED_LOCALITY_SUCCESS,
  LOCALITY_SERVICE_GET_CURATED_LOCALITIES_SUCCESS,
  LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_SUCCESS:
    case LOCALITY_SERVICE_GET_CURATED_LOCALITY_SUCCESS:
    case LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case LOCALITY_SERVICE_GET_CURATED_LOCALITIES_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
