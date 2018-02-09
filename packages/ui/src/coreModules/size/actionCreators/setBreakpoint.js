import { SIZE_SET_BREAKPOINT } from '../actionTypes'

export default function setBreakpoint(breakpoint) {
  return {
    payload: breakpoint,
    type: SIZE_SET_BREAKPOINT,
  }
}
