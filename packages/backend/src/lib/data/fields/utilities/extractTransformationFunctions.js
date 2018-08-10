module.exports = function extractTransformationFunctions({
  format = 'array',
  fieldsSpecification,
}) {
  const { decorators = [], fields = [] } = fieldsSpecification

  if (format === 'array') {
    const transformations = []
    decorators.forEach(({ transformation }) => {
      if (transformation) {
        transformations.push(transformation)
      }
    })

    fields.forEach(({ transformation }) => {
      if (transformation) {
        transformations.push(transformation)
      }
    })
    return transformations
  }

  if (format === 'object') {
    const transformations = {}

    fields.forEach(({ key, transformation }) => {
      if (transformation) {
        transformations[key] = transformation
      }
    })

    decorators.forEach(({ key, transformation }) => {
      if (transformation) {
        transformations[key] = transformation
      }
    })
    return transformations
  }

  throw new Error(`Unknown format: ${format}`)
}
