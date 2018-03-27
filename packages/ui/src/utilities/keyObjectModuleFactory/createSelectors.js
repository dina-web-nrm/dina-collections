import { createGetter } from 'utilities/stateHelper'

export const createSelector = keySpecification => {
  const { key } = keySpecification
  const getter = createGetter([key])
  return function selector(state, parameters) {
    return getter(state, parameters)
  }
}

export default function createSelectors({ keySpecifications, name }) {
  const getLocalState = state => {
    return state[name]
  }

  const getSelectors = Object.keys(keySpecifications.set).reduce(
    (selectors, key) => {
      const keySpecification = keySpecifications.set[key]
      const selector = createSelector(keySpecification)

      return {
        ...selectors,
        [key]: selector,
      }
    },
    {}
  )

  return {
    get: getSelectors,
    getLocalState,
  }
}
