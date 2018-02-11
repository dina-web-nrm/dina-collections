const { ERROR_CODES, ORIGINS, TYPES } = require('../constants')

const createError = require('./base')

module.exports = function createSystemError(error) {
  const errorCode =
    (error.errorCode && ERROR_CODES[error.errorCode]) ||
    ERROR_CODES.DEFAULT_SYSTEM
  const context = {
    errorCode, // const from consts
    origin: ORIGINS.CLIENT,
    statusCode: null,
    type: TYPES.SYSTEM,
  }
  return createError({
    context,
    error,
  })
}
