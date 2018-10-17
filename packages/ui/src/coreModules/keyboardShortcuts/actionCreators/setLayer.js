import { KEYBOARD_SHORTCUTS_SET_LAYER } from '../actionTypes'

export default function setLayer(layer) {
  return {
    payload: layer,
    type: KEYBOARD_SHORTCUTS_SET_LAYER,
  }
}
