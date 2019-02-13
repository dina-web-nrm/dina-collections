const createSchemaValidator = require('../../jsonSchema/createNormalizedValidator')
const backendError = require('../errorFactories/backendError')
const createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv')

const typeOptionMap = {
  'request-body': {
    code: 'REQUEST_BODY_VALIDATION_ERROR',
    status: 400,
  },
  'request-path-parameters': {
    code: 'REQUEST_PATH_PARAMETERS_VALIDATION_ERROR',
    status: 400,
  },
  'request-query': {
    code: 'REQUEST_QUERY_VALIDATION_ERROR',
    status: 400,
  },
  response: {
    code: 'RESPONSE_VALIDATION_ERROR',
    status: 500,
  },
}

module.exports = function createBackendApiClientValidator({
  detail: detailInput,
  model,
  operationId,
  schema,
  throwError,
  type,
}) {
  const options = typeOptionMap[type]
  if (!options) {
    throw new Error(`Invalid type: ${type}`)
  }

  const source = operationId
    ? `backendApiClientValidator - ${operationId}`
    : 'backendApiClientValidator'

  const validator = createSchemaValidator({ model, schema })

  return function validate(obj) {
    const ajvErrors = validator(obj)
    if (!ajvErrors) {
      return ajvErrors
    }

    const parameterErrors = createParameterErrorsFromAjv(ajvErrors)
    return backendError({
      ...options,
      detail: detailInput,
      model,
      parameterErrors,
      schema,
      source,
      throwError,
    })
  }
}
