const { ERROR_CODES, ORIGINS, TYPES } = require('../constants')

const createError = require('./base')

module.exports = function createSystemErrorFactory({ context } = {}) {
  return function createSystemError(error) {
    const errorCode =
      (error.errorCode && ERROR_CODES[error.errorCode]) ||
      ERROR_CODES.DEFAULT_SYSTEM
    const meta = {
      context,
      errorCode,
      origin: ORIGINS.CLIENT,
      status: null,
      type: TYPES.SYSTEM,
    }
    return createError({
      error,
      meta,
    })
  }
}
