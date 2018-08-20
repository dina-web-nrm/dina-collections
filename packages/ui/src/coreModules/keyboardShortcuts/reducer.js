import immutable from 'object-path-immutable'

import {
  KEYBOARD_SHORTCUTS_REGISTER,
  KEYBOARD_SHORTCUTS_SET_MODAL_HIDDEN,
  KEYBOARD_SHORTCUTS_SET_MODAL_VISIBLE,
  KEYBOARD_SHORTCUTS_UNREGISTER,
} from './actionTypes'

export const initialState = {
  shortcuts: {},
  showInfo: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case KEYBOARD_SHORTCUTS_REGISTER: {
      return immutable.set(
        state,
        `shortcuts.${action.payload.command}`,
        action.payload
      )
    }

    case KEYBOARD_SHORTCUTS_UNREGISTER: {
      return immutable.del(state, `shortcuts.${action.payload.command}`)
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
