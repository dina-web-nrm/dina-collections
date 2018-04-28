import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'
import {
  TAXON_SERVICE_CREATE_TAXON_NAME_SUCCESS,
  TAXON_SERVICE_GET_TAXON_NAME_SUCCESS,
  TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS,
  TAXON_SERVICE_UPDATE_TAXON_NAME_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case TAXON_SERVICE_CREATE_TAXON_NAME_SUCCESS:
    case TAXON_SERVICE_GET_TAXON_NAME_SUCCESS:
    case TAXON_SERVICE_UPDATE_TAXON_NAME_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
