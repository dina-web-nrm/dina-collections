const { compose } = require('redux')
const createSchemaValidator = require('../../jsonSchema/createValidator')
const formErrorFactory = require('../errorFactories/form')
const ajvErrorMapper = require('../errorMappers/ajv')

const errorHandler = compose(formErrorFactory, ajvErrorMapper)

module.exports = function createFormSchemaValidator(schema) {
  return createSchemaValidator({
    errorHandler,
    schema,
  })
}
