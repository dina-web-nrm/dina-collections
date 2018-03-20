const createSchemaValidator = require('../../jsonSchema/createNormalizedValidator')
const frontendError = require('../errorFactories/frontendError')
const createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv')

const typeOptionMap = {
  config: {
    code: 'CONFIG_ERROR',
    status: 500,
  },
}

module.exports = function createSystemFrontendValidator({
  model,
  schema,
  throwError,
  type,
}) {
  const options = typeOptionMap[type]
  if (!options) {
    throw new Error(`Invalid type: ${type}`)
  }

  const source = 'systemFrontendValidator'

  const validator = createSchemaValidator({ model, schema })

  return function validate(obj) {
    const ajvErrors = validator(obj)
    if (!ajvErrors) {
      return ajvErrors
    }

    const parameterErrors = createParameterErrorsFromAjv(ajvErrors)
    const detail = JSON.stringify(parameterErrors || {})

    return frontendError({
      ...options,
      detail,
      model,
      parameterErrors,
      schema,
      source,
      throwError,
    })
  }
}
