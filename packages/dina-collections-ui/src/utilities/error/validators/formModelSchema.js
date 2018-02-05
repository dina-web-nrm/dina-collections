const { compose } = require('redux')
const createSchemaValidator = require('../../jsonSchema/createValidator')
const formErrorFactory = require('../errorFactories/form')
const ajvErrorMapper = require('../errorMappers/ajv')

const errorHandler = compose(formErrorFactory, ajvErrorMapper)

module.exports = function createFormModelSchemaValidator({ model, schema }) {
  return createSchemaValidator({
    errorHandler,
    model,
    schema,
  })
}
