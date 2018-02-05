export default function wrapSelectors(selectors, globalSelectors = {}) {
  const { getLocalState, ...selectorsToWrap } = selectors

  if (!getLocalState) {
    throw new Error('getLocalState selector is required')
  }

  const wrappedSelectors = Object.keys(selectorsToWrap).reduce(
    (result, selectorName) => {
      return {
        ...result,
        [selectorName]: (state, ...args) =>
          selectors[selectorName](getLocalState(state), ...args),
      }
    },
    {}
  )

  return {
    ...wrappedSelectors,
    ...globalSelectors,
  }
}
