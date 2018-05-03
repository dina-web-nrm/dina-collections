import {
  updateResourceInState,
  updateResourcesInState,
} from 'utilities/stateHelper'

import {
  CURATED_LIST_SERVICE_CREATE_PREPARATION_TYPE_SUCCESS,
  CURATED_LIST_SERVICE_GET_PREPARATION_TYPE_SUCCESS,
  CURATED_LIST_SERVICE_GET_PREPARATION_TYPES_SUCCESS,
  CURATED_LIST_SERVICE_UPDATE_PREPARATION_TYPE_SUCCESS,
} from '../../../actionTypes'

export const getInitialState = () => {
  return {}
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case CURATED_LIST_SERVICE_CREATE_PREPARATION_TYPE_SUCCESS:
    case CURATED_LIST_SERVICE_GET_PREPARATION_TYPE_SUCCESS:
    case CURATED_LIST_SERVICE_UPDATE_PREPARATION_TYPE_SUCCESS: {
      return updateResourceInState(state, action)
    }

    case CURATED_LIST_SERVICE_GET_PREPARATION_TYPES_SUCCESS: {
      return updateResourcesInState(state, action)
    }

    default: {
      return state
    }
  }
}
