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

module.exports = function createError({ context, error }) {
  const {
    errorCode,
    origin,
    statusCode,
    type,
    userInteraction = false,
    verbose = false,
  } = context

  const errorMessage = createErrorMessageFromError(error)

  const message = verbose
    ? `ERROR - ${errorCode}, ${origin}, ${type}, \n\n ${JSON.stringify(error)}`
    : `ERROR - ${errorCode}, ${origin}, ${type}, ${errorMessage}`

  return {
    _known: true,
    error,
    errorCode: errorCode || ERROR_CODES.UNKNOWN,
    message,
    origin,
    statusCode,
    type,
    userInteraction,
  }
}
