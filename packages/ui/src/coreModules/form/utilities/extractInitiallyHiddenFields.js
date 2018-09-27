export default function extractInitiallyHiddenFields(items) {
  const hiddenFields = []

  items.forEach(
    ({ getNestedName, initiallyHidden, initiallyHiddenNames, name }) => {
      if (initiallyHidden) {
        if (initiallyHiddenNames) {
          initiallyHiddenNames.forEach(hiddenName =>
            hiddenFields.push({ name: hiddenName })
          )
        } else if (getNestedName) {
          hiddenFields.push({ getNestedName, name })
        } else {
          hiddenFields.push({ name })
        }
      }
    }
  )

  return hiddenFields
}
