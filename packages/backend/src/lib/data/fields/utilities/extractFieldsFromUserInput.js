module.exports = function extractFieldsFromUserInput(
  { fieldsInput, selectableFields } = {}
) {
  if (!(fieldsInput && fieldsInput.length)) {
    return []
  }

  const selectableFieldsMap = (selectableFields || []).reduce((obj, key) => {
    obj[key] = true // eslint-disable-line no-param-reassign
    return obj
  }, {})

  return fieldsInput.filter(fieldInput => {
    return selectableFieldsMap[fieldInput]
  })
}
