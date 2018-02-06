module.exports = function mapErrors(ajvErrors) {
  return ajvErrors.map(originalError => {
    const error = originalError.params.errors
      ? originalError.params.errors[0]
      : originalError

    const rootPath = error.dataPath
    const property = error.params.missingProperty
      ? `/${error.params.missingProperty}`
      : ''
    let fullPath = `${rootPath}${property}`.replace(/\//g, '.').substring(1)

    if (error.parentSchema && error.parentSchema.type === 'array') {
      fullPath += '._error'
    }

    return {
      ...error,
      fullPath,
      originalError,
      property,
    }
  })
}
