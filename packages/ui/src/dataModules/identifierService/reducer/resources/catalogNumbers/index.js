import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'
import {
  IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_SUCCESS,
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_SUCCESS,
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_SUCCESS,
  IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_SUCCESS:
    case IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_SUCCESS:
    case IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
