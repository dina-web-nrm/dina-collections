import { KEYBOARD_SHORTCUTS_UNREGISTER } from '../actionTypes'

export default function unregisterKeyboardShortcut(command) {
  return {
    payload: { command },
    type: KEYBOARD_SHORTCUTS_UNREGISTER,
  }
}
