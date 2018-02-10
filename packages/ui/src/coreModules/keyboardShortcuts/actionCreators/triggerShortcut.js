import { KEYBOARD_SHORTCUTS_TRIGGER } from '../actionTypes'

export default function triggerShortcut(shortcut) {
  return {
    payload: shortcut,
    type: KEYBOARD_SHORTCUTS_TRIGGER,
  }
}
