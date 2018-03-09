const errorCodes = require('../constants/errorCodes')
const errorStatus = require('../constants/errorStatus')

module.exports = function frontendError({
  code: inputCode,
  detail,
  parameterErrors,
  path,
  status: inputStatus,
  throwError = true,
}) {
  const { stack } = new Error('frontendError')

  let baseError = errorCodes[inputCode]
  if (!baseError) {
    baseError = errorCodes.INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE
  }

  const { status } = errorStatus[inputStatus] || {}

  const error = {
    ...baseError,
    _dinaError: true,
    detail,
    parameterErrors,
    path,
    stack,
    status: Number(status),
  }

  if (throwError) {
    throw error
  }
  return error
}
