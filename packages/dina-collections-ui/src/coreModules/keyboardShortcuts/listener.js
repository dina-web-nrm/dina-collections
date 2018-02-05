/* eslint-disable no-console */

import globalUserSelectors from 'coreModules/user/globalSelectors'
import { START_KEY, RESET_TIME } from './constants'
import { createFindShortcut } from './utilities'
import { triggerShortcut } from './actionCreators'
import globalSelectors from './globalSelectors'

export const start = ({ dispatch, getState }) => {
  const findShortcut = createFindShortcut({
    resetTime: RESET_TIME,
    startKey: START_KEY,
  })

  const listenerFunction = event => {
    const shortcutSpecifications = globalSelectors.getCommandShortcutMap(
      getState()
    )
    const matchingShortcut = findShortcut({
      event,
      shortcutSpecifications,
    })

    if (matchingShortcut) {
      const shortcutsActive = globalUserSelectors.getUserPreferencesShortcutsActive(
        getState()
      )
      if (shortcutsActive) {
        dispatch(triggerShortcut(matchingShortcut))
      } else {
        console.warn(
          'Tried to trigger shortcut but not active in user preferences'
        )
      }
    }
  }

  document.addEventListener('keydown', listenerFunction)

  return function stop() {
    document.removeEventListener('keydown', listenerFunction)
  }
}
