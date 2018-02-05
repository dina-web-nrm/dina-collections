import {
  registerModuleProperty,
  unregisterModuleProperty,
} from 'coreModules/bootstrap/utilities'

import {
  BOOTSTRAP_UNREGISTER_MODULES,
  BOOTSTRAP_REGISTER_MODULES,
} from 'coreModules/bootstrap/actionTypes'

import {
  KEYBOARD_SHORTCUTS_SET_MODAL_VISIBLE,
  KEYBOARD_SHORTCUTS_SET_MODAL_HIDDEN,
} from './actionTypes'

export const initialState = {
  shortcuts: {},
  showInfo: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BOOTSTRAP_REGISTER_MODULES: {
      const nextState = registerModuleProperty({
        action,
        property: 'shortcuts',
        state,
      })
      return nextState
    }

    case BOOTSTRAP_UNREGISTER_MODULES: {
      const nextState = unregisterModuleProperty({
        action,
        property: 'shortcuts',
        state,
      })
      return nextState
    }

    case KEYBOARD_SHORTCUTS_SET_MODAL_VISIBLE: {
      return {
        ...state,
        showInfo: true,
      }
    }

    case KEYBOARD_SHORTCUTS_SET_MODAL_HIDDEN: {
      return {
        ...state,
        showInfo: false,
      }
    }

    default: {
      return state
    }
  }
}
