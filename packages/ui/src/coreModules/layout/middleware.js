import { SIZE_SET_BREAKPOINT } from 'coreModules/size/actionTypes'
import { SIZE_SMALL } from 'coreModules/size/constants'
import { actionCreators } from './keyObjectModule'
import { LAYOUT_SINGLE } from './constants'

export default function layoutMiddleware() {
  return ({ dispatch }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case SIZE_SET_BREAKPOINT: {
        if (action.payload.size === SIZE_SMALL) {
          dispatch(actionCreators.set.layoutMode(LAYOUT_SINGLE))
        }
        break
      }
      default:
        break
    }
    return result
  }
}
