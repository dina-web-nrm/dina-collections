import { createGetter } from 'utilities/stateHelper'

export const createSelector = (keySpecification, reducerKey) => {
  const { key } = keySpecification
  const segments = reducerKey ? [reducerKey, ...key.split('.')] : key.split('.')
  const getter = createGetter(segments)
  return function selector(state, parameters) {
    return getter(state, parameters)
  }
}

export default function createSelectors({
  keySpecifications,
  name,
  reducerKey,
}) {
  const getLocalState = state => {
    return state[name]
  }

  const getSelectors = Object.keys(keySpecifications.set).reduce(
    (selectors, key) => {
      const keySpecification = keySpecifications.set[key]
      const selector = createSelector(keySpecification, reducerKey)

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
