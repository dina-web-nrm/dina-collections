import { SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE } from './constants'

export const getLocalState = state => {
  return state.size
}

export const getBreakpoints = state => {
  return state && state.breakpoints
}

export const getCurrentBreakpoint = state => {
  return state && state.currentBreakpoint
}

export const getBreakpointByWidth = (state, width) => {
  const breakpoints = getBreakpoints(state)
  /* eslint-disable no-plusplus */
  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i]
    if (breakpoint.maxWidth && breakpoint.maxWidth > width) {
      return breakpoint
    }
  }
  /* eslint-enable no-plusplus */
  return breakpoints[breakpoints.length - 1]
}

export const getSize = state => {
  const currentBreakpoint = getCurrentBreakpoint(state)
  return currentBreakpoint && currentBreakpoint.size
}

export const getIsSmall = state => {
  return getSize(state) === SIZE_SMALL
}

export const getIsMedium = state => {
  return getSize(state) === SIZE_MEDIUM
}

export const getIsLarge = state => {
  return getSize(state) === SIZE_LARGE
}
