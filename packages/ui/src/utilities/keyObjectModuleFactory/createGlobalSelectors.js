import wrapSelectors from 'utilities/wrapSelectors'

export default function createGlobalSelectors(selectors) {
  const wrappedGetSelectors = wrapSelectors({
    getLocalState: selectors.getLocalState,
    ...selectors.get,
  })

  const wrappedIndexGetSelectors = wrapSelectors({
    getLocalState: selectors.getLocalState,
    ...selectors.indexGet,
  })

  const globalSelectors = {
    get: wrappedGetSelectors,
    getLocalState: selectors.getLocalState,
    indexGet: wrappedIndexGetSelectors,
  }
  return globalSelectors
}
