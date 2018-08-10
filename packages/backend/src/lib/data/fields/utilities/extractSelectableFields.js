module.exports = function extractSelectableFields({ fieldsSpecification }) {
  const { fields } = fieldsSpecification

  return fields
    .map(({ fieldPath, selectable }) => {
      if (selectable) {
        return fieldPath
      }
      return null
    })
    .filter(fieldPath => {
      return !!fieldPath
    })
}
