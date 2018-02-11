import Dependor from 'utilities/Dependor'

import { toggleShortcutsModal } from './actionCreators'
import { KEYBOARD_SHORTCUTS_TRIGGER } from './actionTypes'
import { displayShortcuts as displayShortcutsShortcut } from './shortcuts'

export const dep = new Dependor({
  toggleShortcutsModal,
})

export default function createKeyboardShortcuts() {
  return ({ dispatch }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case KEYBOARD_SHORTCUTS_TRIGGER: {
        if (action.payload.code === displayShortcutsShortcut.code) {
          dispatch(dep.toggleShortcutsModal())
        }
        break
      }

      default:
        break
    }
    return result
  }
}
