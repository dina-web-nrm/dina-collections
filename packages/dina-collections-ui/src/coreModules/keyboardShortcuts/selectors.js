import { createSelector } from 'reselect'

import { START_KEY } from './constants'

export const getLocalState = state => {
  return state.keyboardShortcuts
}

export const getShortcuts = state => {
  return state.shortcuts
}

export const getShowInfo = state => {
  return state.showInfo
}

export const getCommandShortcutMap = createSelector(getShortcuts, shortcuts => {
  return Object.keys(shortcuts).reduce((commandShortcutMap, moduleName) => {
    const moduleShortcuts = shortcuts[moduleName]
    const moduleCommandShortcutMap = {}

    Object.keys(moduleShortcuts).forEach(shortcutName => {
      const { code, description, ...rest } = moduleShortcuts[shortcutName]

      if (commandShortcutMap[code]) {
        console.warn(`Shortcut code: ${code} already added`) // eslint-disable-line no-console
      } else {
        const codeWithStartKey = `${START_KEY}${code}`
        moduleCommandShortcutMap[codeWithStartKey] = {
          ...rest,
          code,
          description,
          moduleName,
          shortcutName,
        }
      }
    })

    return {
      ...commandShortcutMap,
      ...moduleCommandShortcutMap,
    }
  }, {})
})

export const getShortcutDescriptionList = createSelector(
  getShortcuts,
  shortcuts => {
    return Object.keys(shortcuts).reduce(
      (shortcutDescriptionList, moduleName) => {
        const moduleShortcuts = shortcuts[moduleName]

        return [
          ...shortcutDescriptionList,
          ...Object.keys(moduleShortcuts).reduce(
            (moduleShortcutDescriptionList, shortcutKey) => {
              const { code, description } = moduleShortcuts[shortcutKey]
              const codeWithStartKey = `${START_KEY}${code}`
              return [
                ...moduleShortcutDescriptionList,
                {
                  code: codeWithStartKey.split('').join(' + '),
                  description,
                  key: shortcutKey,
                  module: moduleName,
                },
              ]
            },
            []
          ),
        ]
      },
      []
    )
  }
)
