import {
  includesModule,
  setModuleConfig,
} from 'coreModules/bootstrap/utilities'

import { BOOTSTRAP_REGISTER_MODULES } from 'coreModules/bootstrap/actionTypes'
import {
  SIZE_SET_BREAKPOINT,
  SIZE_SET_HEIGHT,
  SIZE_SET_WIDTH,
} from './actionTypes'

import { MODULE_NAME } from './constants'

const initState = {
  // maxWidths from https://semantic-ui.com/elements/container.html
  breakpoints: [
    {
      maxWidth: 768,
      size: 'small',
    },
    {
      maxWidth: 1200,
      size: 'medium',
    },
    {
      size: 'large',
    },
  ],
  currentBreakpoint: null,
  height: null,
  width: null,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case BOOTSTRAP_REGISTER_MODULES: {
      let nextState = state
      if (includesModule(action, MODULE_NAME)) {
        nextState = setModuleConfig({
          action,
          moduleName: MODULE_NAME,
          state,
        })
      }
      return nextState
    }

    case SIZE_SET_BREAKPOINT: {
      return {
        ...state,
        currentBreakpoint: action.payload,
      }
    }

    case SIZE_SET_HEIGHT: {
      return {
        ...state,
        height: action.payload,
      }
    }

    case SIZE_SET_WIDTH: {
      return {
        ...state,
        width: action.payload,
      }
    }

    default:
      return state
  }
}
