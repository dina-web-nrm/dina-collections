import { throttle } from 'lodash'
import { setBreakpoint, setHeight, setWidth } from './actionCreators'
import globalSelectors from './globalSelectors'

export const getClientHeight = () => {
  return window.innerHeight || document.documentElement.clientHeight
}

export const getClientWidth = () => {
  return window.innerWidth || document.documentElement.clientWidth
}

export const updateBreakpoint = ({ dispatch, getState }) => {
  const state = getState()
  const height = getClientHeight()
  const width = getClientWidth()
  const fittingBreakpoint = globalSelectors.getBreakpointByWidth(state, width)
  const currentBreakpoint = globalSelectors.getCurrentBreakpoint(state)
  const heightInState = globalSelectors.getHeight(state)
  const widthInState = globalSelectors.getWidth(state)
  if (fittingBreakpoint !== currentBreakpoint) {
    dispatch(setBreakpoint(fittingBreakpoint))
  }
  if (height !== heightInState) {
    dispatch(setHeight(height))
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
