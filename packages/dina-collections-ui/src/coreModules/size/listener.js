import throttle from 'lodash.throttle'
import { setBreakpoint } from './actionCreators'
import globalSelectors from './globalSelectors'

export const getClientWidth = () => {
  return window.innerWidth || document.documentElement.clientWidth
}

export const updateBreakpoint = ({ dispatch, getState }) => {
  const state = getState()
  const width = getClientWidth()
  const fittingBreakpoint = globalSelectors.getBreakpointByWidth(state, width)
  const currentBreakpoint = globalSelectors.getCurrentBreakpoint(state)
  if (fittingBreakpoint !== currentBreakpoint) {
    dispatch(setBreakpoint(fittingBreakpoint))
  }
}

export const start = ({ dispatch, getState }) => {
  updateBreakpoint({
    dispatch,
    getState,
  })

  const listener = throttle(() => {
    updateBreakpoint({
      dispatch,
      getState,
    })
  }, 150)

  window.addEventListener('resize', listener)

  return function stop() {
    window.removeEventListener('resize', listener)
  }
}
