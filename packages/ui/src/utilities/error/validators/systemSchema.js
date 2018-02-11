const { compose } = require('redux')
const createSchemaValidator = require('../../jsonSchema/createValidator')
const systemErrorFactory = require('../errorFactories/system')
const ajvErrorMapper = require('../errorMappers/ajv')

const errorHandler = compose(systemErrorFactory, ajvErrorMapper)

module.exports = function createSystemSchemaValidator(schema) {
  return createSchemaValidator({
    errorHandler,
    schema,
  })
}
