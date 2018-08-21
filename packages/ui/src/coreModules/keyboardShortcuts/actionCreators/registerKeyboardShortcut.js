import { KEYBOARD_SHORTCUTS_REGISTER } from '../actionTypes'

export default function registerKeyboardShortcut({ command, description }) {
  return {
    payload: { command, description },
    type: KEYBOARD_SHORTCUTS_REGISTER,
  }
}
