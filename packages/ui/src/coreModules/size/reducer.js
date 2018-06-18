import {
  includesModule,
  setModuleConfig,
} from 'coreModules/bootstrap/utilities'

import { BOOTSTRAP_REGISTER_MODULES } from 'coreModules/bootstrap/actionTypes'
import { SIZE_SET_BREAKPOINT, SIZE_SET_WIDTH } from './actionTypes'

import { MODULE_NAME } from './constants'

const initState = {
  breakpoints: [],
  currentBreakpoint: null,
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
