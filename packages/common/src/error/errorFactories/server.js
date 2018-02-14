const { ERROR_CODES, ORIGINS, TYPES } = require('../constants')

const createError = require('./base')

module.exports = function createApiErrorFactory({ context } = {}) {
  return function createApiError(error) {
    const errorCode =
      (error.errorCode && ERROR_CODES[error.errorCode]) ||
      ERROR_CODES.DEFAULT_API_ERROR

    let statusFromContext
    if (context === 'inputBodyValidation') {
      statusFromContext = 400
    }

    const meta = {
      context,
      errorCode, // const from consts
      origin: ORIGINS.SERVER,
      status: error.status || statusFromContext || null,
      type: TYPES.API,
    }
    return createError({
      error,
      meta,
    })
  }
}
