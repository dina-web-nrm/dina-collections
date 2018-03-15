const createErrorId = require('../utilities/createErrorId')

const errorCodes = require('../constants/errorCodes')
const errorStatus = require('../constants/errorStatus')

module.exports = function backendError({
  code: inputCode,
  detail,
  parameterErrors,
  path,
  source,
  status: inputStatus,
  throwError = true,
}) {
  const { stack } = new Error('backendError')

  let baseError = errorCodes[inputCode]
  if (!baseError) {
    baseError = errorCodes.INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE
  }

  let { status } = errorStatus[inputStatus] || {}
  if (!status) {
    baseError = errorCodes.INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE
    status = 500
  }

  const message = `${status}, ${baseError.code}, ${detail} `

  const error = {
    ...baseError,
    _dinaError: true,
    detail,
    id: createErrorId(),
    message,
    parameterErrors,
    path,
    source,
    stack,
    status: Number(status),
  }

  if (throwError) {
    throw error
  }
  return error
}
