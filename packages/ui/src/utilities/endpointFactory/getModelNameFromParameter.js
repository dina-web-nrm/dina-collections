module.exports = function getModelNameFromParameter({ schema }) {
  if (!schema) {
    return null
  }

  const segments = schema.$ref.split('/')

  return segments[segments.length - 1]
}
