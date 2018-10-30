const createValidatorFactory = require('../../jsonSchema/createValidatorFactory')
const transformToReduxFormError = require('../errorFactories/transformToReduxFormError')
const createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv')

module.exports = function formValidator({ keywords, model, models, schema }) {
  const createSchemaValidator = createValidatorFactory({ keywords, models })
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
