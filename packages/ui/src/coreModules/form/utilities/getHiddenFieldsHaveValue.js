export default function getHiddenFieldsHaveValue({
  formValueSelector,
  fields,
  state,
}) {
  return fields.reduce((hasValue, { getNestedName, name }) => {
    if (hasValue) {
      return true
    }

    const fieldName = getNestedName
      ? getNestedName({ formValueSelector, name, state })
      : name
    const value = formValueSelector(state, fieldName)

    if (value || value === 0) {
      return true
    }

    return false
  }, false)
}
