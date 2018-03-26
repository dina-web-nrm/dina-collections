import { createGetter } from 'utilities/stateHelper'

export default function createSelectors({ keyMap, name }) {
  const getLocalState = state => {
    return state[name]
  }

  const getSelectors = Object.keys(keyMap.set).reduce((selectors, key) => {
    const getter = createGetter([key])
    return {
      ...selectors,
      [key]: state => {
        return getter(state)
      },
    }
  }, {})

  const indexGetSelectors = Object.keys(keyMap.indexSet).reduce(
    (selectors, key) => {
      const getter = createGetter([':index', key])
      return {
        ...selectors,
        [key]: (state, index) => {
          return getter(state, { index })
        },
      }
    },
    {}
  )

  return {
    get: getSelectors,
    getLocalState,
    indexGet: indexGetSelectors,
  }
}
