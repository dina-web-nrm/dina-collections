const { ERROR_CODES, ORIGINS, TYPES } = require('../constants')

const createError = require('./base')

module.exports = function createApiError(error) {
  const errorCode =
    (error.errorCode && ERROR_CODES[error.errorCode]) ||
    ERROR_CODES.DEFAULT_API_ERROR
  const context = {
    errorCode, // const from consts
    origin: ORIGINS.SERVER,
    statusCode: error.statusCode || null,
    type: TYPES.API,
  }
  return createError({
    context,
    error,
  })
}
