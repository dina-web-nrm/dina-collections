module.exports = function extractSortableFields({ fieldsSpecification }) {
  const { fields } = fieldsSpecification

  return fields
    .map(({ fieldPath, sortable }) => {
      if (sortable) {
        return fieldPath
      }
      return null
    })
    .filter(fieldPath => {
      return !!fieldPath
    })
}
