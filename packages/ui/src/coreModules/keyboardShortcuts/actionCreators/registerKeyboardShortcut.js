import { KEYBOARD_SHORTCUTS_REGISTER } from '../actionTypes'

export default function registerKeyboardShortcut({
  activeInLayer,
  command,
  description,
}) {
  return {
    payload: { activeInLayer, command, description },
    type: KEYBOARD_SHORTCUTS_REGISTER,
  }
}
