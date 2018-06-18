import throttle from 'lodash.throttle'
import { setBreakpoint, setWidth } from './actionCreators'
import globalSelectors from './globalSelectors'

export const getClientWidth = () => {
  return window.innerWidth || document.documentElement.clientWidth
}

export const updateBreakpoint = ({ dispatch, getState }) => {
  const state = getState()
  const width = getClientWidth()
  const fittingBreakpoint = globalSelectors.getBreakpointByWidth(state, width)
  const currentBreakpoint = globalSelectors.getCurrentBreakpoint(state)
  const widthInState = globalSelectors.getWidth(state)
  if (fittingBreakpoint !== currentBreakpoint) {
    dispatch(setBreakpoint(fittingBreakpoint))
  }
  if (width !== widthInState) {
    dispatch(setWidth(width))
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
