import { createSelector } from 'reselect'

export const getLocalState = state => {
  return state.keyboardShortcuts
}

export const getShortcuts = state => {
  return state.shortcuts
}

export const getShortcutsList = createSelector(
  getShortcuts,
  (shortcutsMap = {}) => Object.values(shortcutsMap)
)

export const getShowInfo = state => {
  return state.showInfo
}
