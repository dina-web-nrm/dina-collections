import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'
import {
  TAXON_SERVICE_CREATE_TAXON_SUCCESS,
  TAXON_SERVICE_GET_TAXON_SUCCESS,
  TAXON_SERVICE_GET_TAXA_SUCCESS,
  TAXON_SERVICE_UPDATE_TAXON_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case TAXON_SERVICE_CREATE_TAXON_SUCCESS:
    case TAXON_SERVICE_GET_TAXON_SUCCESS:
    case TAXON_SERVICE_UPDATE_TAXON_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case TAXON_SERVICE_GET_TAXA_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
