import wrapSelectors from 'utilities/wrapSelectors'

export default function createGlobalSelectors(selectors) {
  const wrappedGetSelectors = wrapSelectors({
    getLocalState: selectors.getLocalState,
    ...selectors.get,
  })

  const globalSelectors = {
    get: wrappedGetSelectors,
    getLocalState: selectors.getLocalState,
  }
  return globalSelectors
}
