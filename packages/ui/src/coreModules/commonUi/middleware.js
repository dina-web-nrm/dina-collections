import { LOCATION_CHANGE } from 'react-router-redux'
import { closeLeftSidebar } from './actionCreators'
import globalSelectors from './globalSelectors'

export default function commonUiMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case LOCATION_CHANGE: {
        if (globalSelectors.getLeftSidebarIsOpen(getState())) {
          dispatch(closeLeftSidebar())
        }

        break
      }

      default:
        break
    }
    return result
  }
}
