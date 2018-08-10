module.exports = function extractMappings({
  format = 'array',
  fieldsSpecification,
}) {
  const { fields } = fieldsSpecification
  if (format === 'array') {
    return fields
      .map(({ mapping }) => {
        return mapping
      })
      .filter(mapping => {
        return !!mapping
      })
  }

  return fields.reduce((obj, { fieldPath, mapping }) => {
    if (mapping) {
      return {
        ...obj,
        [fieldPath]: mapping,
      }
    }
    return obj
  }, {})
}
