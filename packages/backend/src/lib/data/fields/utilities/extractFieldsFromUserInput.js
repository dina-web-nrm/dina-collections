module.exports = function extractFieldsFromUserInput({
  includeFieldsInput,
  selectableFields,
} = {}) {
  if (!(includeFieldsInput && includeFieldsInput.length)) {
    return []
  }

  const selectableFieldsMap = (selectableFields || []).reduce((obj, key) => {
    obj[key] = true // eslint-disable-line no-param-reassign
    return obj
  }, {})

  return includeFieldsInput.filter(fieldInput => {
    return selectableFieldsMap[fieldInput]
  })
}
