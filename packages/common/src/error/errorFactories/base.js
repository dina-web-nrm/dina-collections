const { ERROR_CODES } = require('../constants')

const createErrorMessageFromError = error => {
  if (Array.isArray(error)) {
    return `${error[0].errorCode} - ${error[0].fullPath} - ${(error[0]
      .originalError.params &&
      JSON.stringify(error[0].originalError.params, null, 2)) ||
      ''}`
  }

  return ''
}

module.exports = function createError({ meta, error }) {
  const {
    context,
    errorCode,
    origin,
    status,
    type,
    userInteraction = false,
    verbose = false,
  } = meta

  const errorMessage = createErrorMessageFromError(error)

  const message = verbose
    ? `ERROR - ${errorCode}, ${origin}, ${type}, \n\n ${JSON.stringify(error)}`
    : `ERROR - ${errorCode}, ${origin}, ${type}, ${errorMessage}`

  return {
    _known: true,
    context,
    error,
    errorCode: errorCode || ERROR_CODES.UNKNOWN,
    message,
    origin,
    status,
    type,
    userInteraction,
  }
}
