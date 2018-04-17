import { LOCATION_CHANGE } from 'react-router-redux'

import { SIZE_SET_BREAKPOINT } from 'coreModules/size/actionTypes'
import { SIZE_SMALL } from 'coreModules/size/constants'
import {
  actionCreators,
  globalSelectors as keyObjectGlobalSelectors,
  selectors,
} from './keyObjectModule'
import { SINGLE } from './constants'

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

      case SIZE_SET_BREAKPOINT: {
        if (action.payload.size === SIZE_SMALL) {
          const layoutState = selectors.getLocalState(getState())
          const layoutStateKeys = Object.keys(layoutState)

          if (layoutStateKeys.length) {
            layoutStateKeys.forEach(name => {
              dispatch(actionCreators.set[':name.layoutMode'](SINGLE, { name }))
            })
          }
        }
        break
      }
      default:
        break
    }
    return result
  }
}
