module.exports = function extractTransformationFunctions({
  format = 'array',
  fieldsSpecification,
}) {
  const { fields } = fieldsSpecification
  if (format === 'array') {
    return fields
      .map(({ transformation }) => {
        return transformation
      })
      .filter(transformation => {
        return !!transformation
      })
  }

  return fields
    .reduce((obj, { key, transformation }) => {
      if (transformation) {
        return {
          ...obj,
          [key]: transformation,
        }
      }
      return obj
    }, {})
    .filter(transformation => {
      return !!transformation
    })
}
