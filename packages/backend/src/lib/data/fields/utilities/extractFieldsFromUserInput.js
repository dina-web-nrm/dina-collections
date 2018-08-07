module.exports = function extractFieldsFromUserInput(
  { fieldsInput, fieldsSpecification } = {}
) {
  if (!(fieldsInput && fieldsInput.length)) {
    return []
  }

  const fieldsSpecificationMap = (
    (fieldsSpecification && fieldsSpecification.fields) ||
    []
  ).reduce((obj, key) => {
    obj[key] = true // eslint-disable-line no-param-reassign
    return obj
  }, {})

  return fieldsInput.filter(fieldInput => {
    return fieldsSpecificationMap[fieldInput]
  })
}
