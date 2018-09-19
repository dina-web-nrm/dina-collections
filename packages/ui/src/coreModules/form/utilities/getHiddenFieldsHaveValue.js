export default function getHiddenFieldsHaveValue({
  formValueSelector,
  keys,
  state,
}) {
  return keys.reduce((hasValue, key) => {
    if (hasValue) {
      return true
    }

    const value = formValueSelector(state, key)

    if (value || value === 0) {
      return true
    }

    return false
  }, false)
}
