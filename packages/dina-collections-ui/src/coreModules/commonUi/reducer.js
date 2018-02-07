import { createSetter } from 'utilities/stateHelper'

import {
  COMMON_UI_CLOSE_LEFT_SIDEBAR,
  COMMON_UI_OPEN_LEFT_SIDEBAR,
} from './actionTypes'

const initState = {
  leftSidebar: {
    isOpen: false,
  },
}

const leftSidebarOpenSetter = createSetter(['leftSidebar', 'isOpen'])

export default function reducer(state = initState, action) {
  switch (action.type) {
    case COMMON_UI_CLOSE_LEFT_SIDEBAR: {
      return leftSidebarOpenSetter(state, false)
    }
    case COMMON_UI_OPEN_LEFT_SIDEBAR: {
      return leftSidebarOpenSetter(state, true)
    }

    default:
      return state
  }
}
