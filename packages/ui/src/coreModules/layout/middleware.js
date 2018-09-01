import { LOCATION_CHANGE } from 'react-router-redux'
import {
  actionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from './keyObjectModule'

export default function layoutMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case LOCATION_CHANGE: {
        if (keyObjectGlobalSelectors.get['leftSidebar.isOpen'](getState())) {
          dispatch(actionCreators.set['leftSidebar.isOpen'](false))
        }

        break
      }

      default:
        break
    }
    return result
  }
}
