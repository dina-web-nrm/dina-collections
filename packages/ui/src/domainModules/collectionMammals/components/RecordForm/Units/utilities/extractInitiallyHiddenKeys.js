export default function extractInitiallyHiddenKeys(items) {
  const hiddenKeys = []

  items.forEach(({ initiallyHidden, initiallyHiddenNames, name }) => {
    if (initiallyHidden) {
      if (initiallyHiddenNames) {
        initiallyHiddenNames.forEach(hiddenName => hiddenKeys.push(hiddenName))
      } else {
        hiddenKeys.push(name)
      }
    }
  })

  return hiddenKeys
}
