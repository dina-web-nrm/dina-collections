const createSchemaValidator = require('../../jsonSchema/createNormalizedValidator')
const createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv')

module.exports = function dbValidator({ model, schema }) {
  const validator = createSchemaValidator({ model, schema })

  return function validate(obj) {
    const ajvErrors = validator(obj)
    if (!ajvErrors) {
      return ajvErrors
    }

    const parameterErrors = createParameterErrorsFromAjv(ajvErrors)

    return parameterErrors
  }
}
