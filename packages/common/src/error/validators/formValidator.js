const createSchemaValidator = require('../../jsonSchema/createValidator')
const transformToReduxFormError = require('../errorFactories/transformToReduxFormError')
const createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv')

module.exports = function formValidator({ model, schema }) {
  const validator = createSchemaValidator({ model, schema })

  return function validate(obj) {
    const ajvErrors = validator(obj)
    if (!ajvErrors) {
      return ajvErrors
    }

    const parameterErrors = createParameterErrorsFromAjv(ajvErrors)
    return transformToReduxFormError({ parameterErrors })
  }
}
